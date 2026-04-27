#![no_std]
use soroban_sdk::{contract, contractimpl, Env, Symbol, Address, storage::PersistentDataKey};

#[contract]
pub struct TipJarContract;

#[contractimpl]
impl TipJarContract {
    // Initialize the contract with an owner
    pub fn init(env: Env, owner: Address) {
        if env.storage().persistent().has(&Symbol::new(&env, "owner")) {
            panic!("Already initialized");
        }
        env.storage().persistent().set(&Symbol::new(&env, "owner"), &owner);
    }

    // Get the owner of the tip jar
    pub fn get_owner(env: Env) -> Address {
        env.storage().persistent().get(&Symbol::new(&env, "owner")).expect("Not initialized")
    }

    // A simple function to log a tip (in a real contract, this might handle tokens)
    pub fn tip(env: Env, sender: Address, amount: i128, message: Symbol) {
        sender.require_auth();
        
        // In a real Soroban contract, you would use the token SDK to transfer funds:
        // let token_client = token::Client::new(&env, &token_id);
        // token_client.transfer(&sender, &get_owner(env.clone()), &amount);
        
        // For this example, we'll just emit an event
        env.events().publish((Symbol::new(&env, "tip"), sender), (amount, message));
    }
}

mod test;
