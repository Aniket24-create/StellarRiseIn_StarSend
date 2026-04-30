#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, symbol_short, Env, Symbol, Address, log};

// Storage keys
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
    /// Can only be called once.
    pub fn init(env: Env, owner: Address) {
        if env.storage().persistent().has(&DataKey::Owner) {
            panic!("Already initialized");
        }
        env.storage().persistent().set(&DataKey::Owner, &owner);
        env.storage().persistent().set(&DataKey::TipCount, &0_u32);
    }

    /// Return the owner of this TipJar.
    pub fn get_owner(env: Env) -> Address {
        env.storage()
            .persistent()
            .get(&DataKey::Owner)
            .expect("Not initialized")
    }

    /// Return the total number of tips sent through this contract.
    pub fn get_tip_count(env: Env) -> u32 {
        env.storage()
            .persistent()
            .get(&DataKey::TipCount)
            .unwrap_or(0)
    }

    /// Record a tip event.
    /// The sender must authorise the call.
    /// `amount`  — tip amount in stroops (1 XLM = 10_000_000 stroops)
    /// `message` — short memo attached to the tip (max ~9 chars as Symbol)
    pub fn tip(env: Env, sender: Address, amount: i128, message: Symbol) {
        // Require the sender to sign this transaction
        sender.require_auth();

        if amount <= 0 {
            panic!("Amount must be positive");
        }

        // Increment tip counter
        let count: u32 = env
            .storage()
            .persistent()
            .get(&DataKey::TipCount)
            .unwrap_or(0);
        env.storage()
            .persistent()
            .set(&DataKey::TipCount, &(count + 1));

        // Emit an event so the frontend / indexers can track tips
        env.events().publish(
            (symbol_short!("tip"), sender.clone()),
            (amount, message),
        );

        log!(&env, "Tip recorded: sender={}, amount={}", sender, amount);
    }
}

mod test;
