#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, symbol_short, Env, Symbol, Address};

#[contracttype]
pub enum DataKey {
    Owner,
    TipCount,
}

#[contract]
pub struct TipJarContract;

#[contractimpl]
impl TipJarContract {
    pub fn init(env: Env, owner: Address) {
        if env.storage().persistent().has(&DataKey::Owner) {
            panic!("Already initialized");
        }
        env.storage().persistent().set(&DataKey::Owner, &owner);
        env.storage().persistent().set(&DataKey::TipCount, &0_u32);
    }

    pub fn get_owner(env: Env) -> Address {
        env.storage()
            .persistent()
            .get(&DataKey::Owner)
            .expect("Not initialized")
    }

    pub fn get_tip_count(env: Env) -> u32 {
        env.storage()
            .persistent()
            .get(&DataKey::TipCount)
            .unwrap_or(0)
    }

    pub fn tip(env: Env, sender: Address, amount: i128, message: Symbol) {
        sender.require_auth();

        if amount <= 0 {
            panic!("Amount must be positive");
        }

        let count: u32 = env
            .storage()
            .persistent()
            .get(&DataKey::TipCount)
            .unwrap_or(0);
        env.storage()
            .persistent()
            .set(&DataKey::TipCount, &(count + 1));

        env.events().publish(
            (symbol_short!("tip"), sender),
            (amount, message),
        );
    }
}

mod test;
