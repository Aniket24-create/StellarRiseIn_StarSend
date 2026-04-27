#![cfg(test)]

use super::{TipJarContract, TipJarContractClient};
use soroban_sdk::{testutils::Address as _, Address, Env, Symbol};

#[test]
fn test() {
    let env = Env::default();
    let contract_id = env.register(TipJarContract, ());
    let client = TipJarContractClient::new(&env, &contract_id);

    let owner = Address::generate(&env);
    client.init(&owner);

    assert_eq!(client.get_owner(), owner);

    let sender = Address::generate(&env);
    env.mock_all_auths();
    
    client.tip(&sender, &1000, &Symbol::new(&env, "Thanks"));
}
