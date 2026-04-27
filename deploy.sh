#!/bin/bash

# 1. Build the contract
echo "Building contract..."
cd contracts
cargo build --target wasm32-unknown-unknown --release

# 2. Deploy to Testnet
echo "Deploying to Testnet..."
stellar contract deploy \
    --wasm target/wasm32-unknown-unknown/release/soroban_hello_world.wasm \
    --source-account SB... (your secret key or alias) \
    --network testnet
