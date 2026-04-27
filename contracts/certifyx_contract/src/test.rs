#![cfg(test)]
use super::*;
use soroban_sdk::{testutils::Address as _, Address, Env, String};

#[test]
fn test_issue_and_verify() {
    let env = Env::default();
    let contract_id = env.register_contract(None, CertifyXContract);
    let client = CertifyXContractClient::new(&env, &contract_id);

    let issuer = Address::generate(&env);
    let cert_id = String::from_str(&env, "CERT123");
    let cert_hash = String::from_str(&env, "HASH456");

    // Mock auth for issuer
    env.mock_all_auths();

    // Issue certificate
    client.issue(&cert_id, &cert_hash, &issuer);

    // Verify certificate
    let verified_issuer = client.verify(&cert_id, &cert_hash);
    assert_eq!(verified_issuer, Some(issuer));

    // Verify with wrong hash
    let wrong_hash = String::from_str(&env, "WRONG");
    let invalid_verify = client.verify(&cert_id, &wrong_hash);
    assert_eq!(invalid_verify, None);
}
