#![cfg(test)]

use super::{TipJarContract, TipJarContractClient};
use soroban_sdk::{testutils::Address as _, Address, Env, symbol_short};

// ─── Test 1: basic init + get_owner ──────────────────────────────────────────
#[test]
fn test_init_and_get_owner() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register_contract(None, TipJarContract);
    let client = TipJarContractClient::new(&env, &contract_id);

    let owner = Address::generate(&env);
    client.init(&owner);

    assert_eq!(client.get_owner(), owner);
}

// ─── Test 2: tip counter increments correctly ────────────────────────────────
#[test]
fn test_tip_increments_count() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register_contract(None, TipJarContract);
    let client = TipJarContractClient::new(&env, &contract_id);

    let owner = Address::generate(&env);
    client.init(&owner);

    // Counter starts at zero
    assert_eq!(client.get_tip_count(), 0);

    let sender = Address::generate(&env);

    // First tip
    client.tip(&sender, &10_000_000_i128, &symbol_short!("Thanks"));
    assert_eq!(client.get_tip_count(), 1);

    // Second tip
    client.tip(&sender, &5_000_000_i128, &symbol_short!("GoodJob"));
    assert_eq!(client.get_tip_count(), 2);
}

// ─── Test 3: double-init must panic ──────────────────────────────────────────
#[test]
#[should_panic(expected = "Already initialized")]
fn test_double_init_panics() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register_contract(None, TipJarContract);
    let client = TipJarContractClient::new(&env, &contract_id);

    let owner = Address::generate(&env);
    client.init(&owner);
    client.init(&owner); // ← must panic
}

// ─── Test 4: zero amount must panic ──────────────────────────────────────────
#[test]
#[should_panic(expected = "Amount must be positive")]
fn test_zero_amount_panics() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register_contract(None, TipJarContract);
    let client = TipJarContractClient::new(&env, &contract_id);

    let owner = Address::generate(&env);
    client.init(&owner);

    let sender = Address::generate(&env);
    client.tip(&sender, &0_i128, &symbol_short!("Bad")); // ← must panic
}

// ─── Test 5: negative amount must panic ──────────────────────────────────────
#[test]
#[should_panic(expected = "Amount must be positive")]
fn test_negative_amount_panics() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register_contract(None, TipJarContract);
    let client = TipJarContractClient::new(&env, &contract_id);

    let owner = Address::generate(&env);
    client.init(&owner);

    let sender = Address::generate(&env);
    client.tip(&sender, &-1_i128, &symbol_short!("Bad")); // ← must panic
}
