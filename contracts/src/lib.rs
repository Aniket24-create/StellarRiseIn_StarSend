#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, symbol_short, Env, Symbol, Address};

// ── Storage keys ─────────────────────────────────────────────────────────────
// Using a typed enum is the idiomatic Soroban pattern.
// Never use raw strings / Symbol keys — they are error-prone and untyped.
#[contracttype]
pub enum DataKey {
    Owner,
    TipCount,
}

// ── Contract struct ───────────────────────────────────────────────────────────
#[contract]
pub struct TipJarContract;

// ── Contract implementation ───────────────────────────────────────────────────
#[contractimpl]
impl TipJarContract {
    /// Initialise the contract.  Must be called exactly once.
    pub fn init(env: Env, owner: Address) {
        if env.storage().persistent().has(&DataKey::Owner) {
            panic!("Already initialized");
        }
        env.storage().persistent().set(&DataKey::Owner, &owner);
        env.storage().persistent().set(&DataKey::TipCount, &0_u32);
    }

    /// Return the owner address set during `init`.
    pub fn get_owner(env: Env) -> Address {
        env.storage()
            .persistent()
            .get(&DataKey::Owner)
            .expect("Not initialized")
    }

    /// Return the total number of tips recorded on-chain.
    pub fn get_tip_count(env: Env) -> u32 {
        env.storage()
            .persistent()
            .get(&DataKey::TipCount)
            .unwrap_or(0)
    }

    /// Record a tip event on-chain.
    ///
    /// * `sender`  – the tipper; must authorise this call via `require_auth`
    /// * `amount`  – tip value in stroops (1 XLM = 10_000_000 stroops)
    /// * `message` – short memo, max 9 ASCII chars (Soroban `Symbol` limit)
    pub fn tip(env: Env, sender: Address, amount: i128, message: Symbol) {
        // Auth check — the sender must sign this invocation
        sender.require_auth();

        if amount <= 0 {
            panic!("Amount must be positive");
        }

        // Increment the persistent tip counter
        let count: u32 = env
            .storage()
            .persistent()
            .get(&DataKey::TipCount)
            .unwrap_or(0);
        env.storage()
            .persistent()
            .set(&DataKey::TipCount, &(count + 1));

        // Emit an on-chain event — indexers and the frontend subscribe to this
        env.events().publish(
            (symbol_short!("tip"), sender),
            (amount, message),
        );
        // NOTE: log!() is intentionally omitted.
        // log! requires the `testutils` feature at runtime and causes
        // compilation errors in the no_std wasm build.
    }
}

// Tests live in a separate file to keep lib.rs clean
mod test;
