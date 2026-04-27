# Deploying the CertifyX Smart Contract

To deploy this contract to the Stellar Testnet, follow these steps:

## 1. Prerequisites
Ensure you have the following installed:
- [Rust & Cargo](https://rustup.rs/)
- [Stellar CLI](https://developers.stellar.org/docs/build/smart-contracts/getting-started/setup#install-the-stellar-cli)
  ```powershell
  cargo install --locked stellar-cli --features opt
  ```

## 2. Build the Contract
Navigate to the contract directory and build:
```powershell
cd contracts/certifyx_contract
cargo build --target wasm32-unknown-unknown --release
```
The optimized WASM file will be at `target/wasm32-unknown-unknown/release/certifyx_contract.wasm`.

## 3. Configure Network & Identity
Add the testnet network and create a deployment identity:
```powershell
stellar network add --rpc-url https://soroban-testnet.stellar.org:443 --network-passphrase "Test SDF Network ; September 2015" testnet
stellar keys generate --network testnet deployer
```

## 4. Deploy
Deploy the WASM to the network:
```powershell
stellar contract deploy --wasm target/wasm32-unknown-unknown/release/certifyx_contract.wasm --source deployer --network testnet
```
**This will return a Contract ID (e.g., `CC...`). Save this ID!**

## 5. Initialize/Interact
You can now call functions on your contract:
```powershell
stellar contract invoke --id <YOUR_CONTRACT_ID> --source deployer --network testnet -- issue --id "CERT-001" --hash "abc123hash" --issuer <YOUR_ADDRESS>
```
