#![cfg(test)]

use super::{TipJarContract, TipJarContractClient};
use soroban_sdk::{testutils::Address as _, Address, Env, symbol_short};

// ─────────────────────────────────────────────────────────────────────────────
// CRITICAL RULE: env.mock_all_auths() MUST be called BEFORE any contract
// invocation that internally calls require_auth().  If it is placed after
// register_contract() but before the first client call, it works correctly.
// ─────────────────────────────────────────────────────────────────────────────

// ── Test 1: init stores owner correctly ──────────────────────────────────────
#[test]
fn test_init_and_get_owner() {
    let env = Env::default();
    env.mock_all_auths(); // ← must be BEFORE any client call

    let contract_id = env.register_contract(None, TipJarContract);
    let client = TipJarContractClient::new(&env, &contract_id);

    let owner = Address::generate(&env);
    client.init(&owner);

    assert_eq!(client.get_owner(), owner);
}

// ── Test 2: tip counter increments on each tip ────────────────────────────────
#[test]
fn test_tip_increments_count() {
    let env = Env::default();
    env.mock_all_auths(); // ← must be BEFORE any client call

    let contract_id = env.register_contract(None, TipJarContract);
    let client = TipJarContractClient::new(&env, &contract_id);

    let owner = Address::generate(&env);
    client.init(&owner);

    // Counter starts at zero
    assert_eq!(client.get_tip_count(), 0);

    let sender = Address::generate(&env);

    // First tip — 1 XLM
    client.tip(&sender, &10_000_000_i128, &symbol_short!("Thanks"));
    assert_eq!(client.get_tip_count(), 1);

    // Second tip — 0.5 XLM
    client.tip(&sender, &5_000_000_i128, &symbol_short!("GoodJob"));
    assert_eq!(client.get_tip_count(), 2);
}

// ── Test 3: calling init twice must panic ─────────────────────────────────────
#[test]
#[should_panic(expected = "Already initialized")]
fn test_double_init_panics() {
    let env = Env::default();
    env.mock_all_auths(); // ← must be BEFORE any client call

    let contract_id = env.register_contract(None, TipJarContract);
    let client = TipJarContractClient::new(&env, &contract_id);

    let owner = Address::generate(&env);
    client.init(&owner);
    client.init(&owner); // ← must panic here
}

// ── Test 4: zero amount must panic ────────────────────────────────────────────
#[test]
#[should_panic(expected = "Amount must be positive")]
fn test_zero_amount_panics() {
    let env = Env::default();
    env.mock_all_auths(); // ← must be BEFORE any client call

    let contract_id = env.register_contract(None, TipJarContract);
    let client = TipJarContractClient::new(&env, &contract_id);

    let owner = Address::generate(&env);
    client.init(&owner);

    let sender = Address::generate(&env);
    client.tip(&sender, &0_i128, &symbol_short!("Bad")); // ← must panic
}

// ── Test 5: negative amount must panic ───────────────────────────────────────
#[test]
#[should_panic(expected = "Amount must be positive")]
fn test_negative_amount_panics() {
    let env = Env::default();
    env.mock_all_auths(); // ← must be BEFORE any client call

    let contract_id = env.register_contract(None, TipJarContract);
    let client = TipJarContractClient::new(&env, &contract_id);

    let owner = Address::generate(&env);
    client.init(&owner);

    let sender = Address::generate(&env);
    client.tip(&sender, &-500_i128, &symbol_short!("Bad")); // ← must panic
}
