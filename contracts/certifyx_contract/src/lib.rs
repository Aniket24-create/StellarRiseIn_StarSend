#![no_std]
use soroban_sdk::{contract, contractimpl, symbol_short, Address, Env, Symbol, String};

#[contract]
pub struct CertifyXContract;

#[contractimpl]
impl CertifyXContract {
    /// Store a certificate hash for a given ID. 
    /// Only the contract caller's address is recorded as the issuer.
    pub fn issue(env: Env, id: String, hash: String, issuer: Address) {
        issuer.require_auth();
        
        let key = symbol_short!("certs");
        let mut certs: soroban_sdk::Map<String, (String, Address)> = env
            .storage()
            .persistent()
            .get(&key)
            .unwrap_or(soroban_sdk::Map::new(&env));

        certs.set(id, (hash, issuer));
        env.storage().persistent().set(&key, &certs);
    }

    /// Verify a certificate hash. Returns the issuer address if valid.
    pub fn verify(env: Env, id: String, hash: String) -> Option<Address> {
        let key = symbol_short!("certs");
        let certs: soroban_sdk::Map<String, (String, Address)> = env
            .storage()
            .persistent()
            .get(&key)
            .unwrap_or(soroban_sdk::Map::new(&env));

        if let Some((stored_hash, issuer)) = certs.get(id) {
            if stored_hash == hash {
                return Some(issuer);
            }
        }
        None
    }
}

mod test;
