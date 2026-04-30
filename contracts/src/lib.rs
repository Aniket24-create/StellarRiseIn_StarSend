#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, symbol_short, Env, Symbol, Address};

/// Storage keys used by this contract.
/// Using a typed enum avoids string-key collisions and is the
/// idiomatic Soroban pattern.
#[contracttype]
pub enum DataKey {
    Owner,
    TipCount,
}

#[contract]
pub struct TipJarContract;

#[contractimpl]
impl TipJarContract {
    /// Initialize the contract with an owner address.
    /// Panics if called more than once.
    pub fn init(env: Env, owner: Address) {
        if env.storage().persistent().has(&DataKey::Owner) {
            panic!("Already initialized");
        }
        env.storage().persistent().set(&DataKey::Owner, &owner);
        env.storage().persistent().set(&DataKey::TipCount, &0_u32);
    }

    /// Return the owner address stored during init.
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
    /// - `sender`  — the tipper; must authorise this call
    /// - `amount`  — tip value in stroops (1 XLM = 10_000_000 stroops)
    /// - `message` — short memo (≤ 9 ASCII chars as a Soroban Symbol)
    pub fn tip(env: Env, sender: Address, amount: i128, message: Symbol) {
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

        // Emit a contract event so indexers / the frontend can track tips
        env.events().publish(
            (symbol_short!("tip"), sender),
            (amount, message),
        );
    }
}

mod test;
