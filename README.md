# StellarRise StarSend - Decentralized Tipping Platform

![StellarRise StarSend](https://img.shields.io/badge/StellarRise-StarSend-blue?style=for-the-badge&logo=stellar)
![Version](https://img.shields.io/badge/version-1.0.0-green?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-orange?style=for-the-badge)
![Network](https://img.shields.io/badge/network-Stellar%20Testnet-purple?style=for-the-badge)

**Your Gateway to the Decentralized Economy**

Send XLM tips instantly with minimal fees on Stellar's lightning-fast blockchain.

[Live Demo](https://starsend.vercel.app) | [Demo Video](#demo-video) | [User Feedback](https://docs.google.com/forms/d/e/1FAIpQLSfAXmUhgvCGcZ1Pz3z42RomTH8jlwUb4Km4pmkGrcBHNLsGfA/viewform?usp=header) 


---

## Features

### Core Functionality

- Instant Tipping — Send XLM tips in under 3 seconds
- Freighter Integration — Secure wallet connection with Freighter
- Real-time Balance — Live XLM balance with USD conversion
- Transaction History — Complete transaction tracking with search and filters
- Quick Tips — Predefined tip amounts (1, 5, 10 XLM)
- QR Code Scanner — Scan Stellar addresses via device camera
- Username System — Send to @username aliases
- Gasless Mode — Option to send without fees

### Modern UI/UX

- Dark Theme — Premium Web3-style dark interface
- Responsive Design — Works on desktop and mobile
- Glassmorphism — Modern glass-effect components
- Gradient Accents — Blue/purple gradient themes

### Security and Performance

- Testnet Safe — Built for Stellar Testnet environment
- Minimal Fees — Only approximately $0.00001 per transaction
- Non-custodial — Your keys never leave your Freighter wallet
- Global Access — Send tips worldwide, 24/7

---

## Demo

### Live Deployment

Live app: [https://starsend.vercel.app](https://starsend.vercel.app)

### Demo Video

Full walkthrough: [Watch Demo Video](https://drive.google.com/file/d/1jcLCZRpz2pcoOp6XA0eqaz_GcZuJgLIM/view?usp=drive_link) 

The demo video covers wallet connection, sending a tip, viewing transaction history, and the success screen.

### Screenshots

| Hero Landing Page | Dashboard | Send Tip |
|---|---|---|
| ![Hero](./screenshots/hero.png) | ![Dashboard](./screenshots/dashboard.png) | ![Send](./screenshots/send.png) |

| Transaction History | Success Screen | Mobile View |
|---|---|---|
| ![History](./screenshots/history.png) | ![Success](./screenshots/success.png) | ![Mobile](./screenshots/mobile.png) |

---

## User Onboarding and Feedback

### Google Form

Users were onboarded via a Google Form collecting: name, email, Stellar wallet address, and product feedback (1-5 star rating).

Form Link: [StellarRise StarSend User Feedback Form](https://forms.gle/yourformlink) *(Replace with your actual Google Form URL)*

---

### Testnet User Wallet Addresses

All wallets are verifiable on [Stellar Expert Testnet Explorer](https://stellar.expert/explorer/testnet).

| # | Name | Wallet Address | Stellar Explorer |
|---|------|---------------|-----------------|
| 1 | User 1 | `GAYMWU2VTZC6646FV4M5753ZZUBIXZHSBLBOLTHBHCVFQIOBZH6D5W4H` | [View](https://stellar.expert/explorer/testnet/account/GAYMWU2VTZC6646FV4M5753ZZUBIXZHSBLBOLTHBHCVFQIOBZH6D5W4H) |
| 2 | User 2 | `GBLUMAX4IIPS54AIGD5WXRRAXISG4HLV3BE3YR3SQAD3GZSXRTVJY5GI` | [View](https://stellar.expert/explorer/testnet/account/GBLUMAX4IIPS54AIGD5WXRRAXISG4HLV3BE3YR3SQAD3GZSXRTVJY5GI) |
| 3 | User 3 | `GDRTJRMXK43GQL5EE25QGULXYRVLJ646E5SCXRX376VMSLSSKSLWONM7` | [View](https://stellar.expert/explorer/testnet/account/GDRTJRMXK43GQL5EE25QGULXYRVLJ646E5SCXRX376VMSLSSKSLWONM7) |
| 4 | User 4 | `GBLSGNNNFFIHR2745JID5AW42TAKULJ7VJWCQBHGUWQKCMCQWLGZ7PVN` | [View](https://stellar.expert/explorer/testnet/account/GBLSGNNNFFIHR2745JID5AW42TAKULJ7VJWCQBHGUWQKCMCQWLGZ7PVN) |
| 5 | User 5 | `GCPM2OH2DFE7IKZT2DF5HLLLIU464MQ4WPJ5BMDBJ5RFYTAQXRAAFGYB` | [View](https://stellar.expert/explorer/testnet/account/GCPM2OH2DFE7IKZT2DF5HLLLIU464MQ4WPJ5BMDBJ5RFYTAQXRAAFGYB) |



---

### User Feedback Summary

The full exported responses are available in the Excel sheet linked below.

Excel Sheet: [user_feedback.xlsx](https://docs.google.com/spreadsheets/d/1f_S_dmKBQVGwUgGoMvFOO4n_MpE6QbIFKNbW1mMf6Lc/edit?usp=sharing) *(Export from Google Forms and attach to the repo)*

#### Feedback Highlights

| User | Rating (1-5) | Key Feedback |
|------|-------------|--------------|
| User 1 | 5/5 | "Super fast, loved the UI. Would like to see a confirmation before sending." |
| User 2 | 5/5 | "Great concept. The memo field did not show the character limit clearly." |
| User 3 | 5/5 | "When I copied my address nothing happened — was not sure it worked." |
| User 4 | 5/5 | "Would love to see USD value when entering an amount to tip." |
| User 5 | 5/5 | "The empty transaction history looked broken — maybe add an icon." |

Average Rating: 5 / 5

---

## Improvement Plan Based on User Feedback

Based on direct feedback collected from our 5 testnet users, the following improvements have been identified for the next iteration.

---

### Planned Iteration 1 - UI/UX Improvements (Future)

#### Change 1: Copy Address with Visual Feedback
User Problem: "When I copied my address nothing happened — was not sure it worked." (User 3)

Planned Solution: The copy button will show a "Copied!" confirmation in green for 2 seconds after clicking, then reset back to "Copy". This gives users clear feedback that the action succeeded.

---

#### Change 2: USD Value Display on Amounts
User Problem: "Would love to see USD value when entering an amount." (User 4)

Planned Solution: All XLM amounts including the balance card, the amount input field, and quick tip buttons will show the live USD equivalent so users always know the real-world value of what they are sending.

---

#### Change 3: Send Confirmation Modal
User Problem: "Would like to see a confirmation before sending." (User 1)

Planned Solution: Clicking "Send Tip" will open a review modal displaying the full transaction breakdown — recipient address, amount, USD value, memo, network fee, and total deducted — before the user confirms. This prevents accidental sends on the blockchain.

---

#### Change 4: Enhanced Empty State in Transaction History
User Problem: "The empty transaction history looked broken." (User 5)

Planned Solution: The empty state will show a friendly icon, a descriptive message explaining that no transactions exist yet, and a "Send Your First Tip" call-to-action button to guide new users.

---

#### Change 5: Memo Character Counter with Live Color
User Problem: "The memo field did not show the character limit clearly." (User 2)

Planned Solution: The memo input will show a live X/28 character counter next to the label. The counter color will shift from gray to yellow at 80% capacity (22 chars) and then red at 28/28. The hint text below will also update to say "Almost at limit" or "Character limit reached".

---

### Planned for Future Phases (v1.2.0+)

- Multi-asset Support — Allow tipping in USDC and other Stellar assets
- QR Code Generation — Generate a shareable QR code for your wallet address
- Tip Scheduling — Schedule recurring tips to favourite creators
- Social Leaderboard — Public leaderboard showing top tippers
- Mobile App — React Native version for iOS and Android
- Mainnet Toggle — Easy switch between testnet and mainnet

---

## Smart Contract (Soroban)

The TipJar smart contract is written in Rust using the **Soroban SDK** and deployed on **Stellar Testnet**.

### Contract Overview

| Property | Value |
|----------|-------|
| **Language** | Rust (Soroban SDK v21.7.6) |
| **Network** | Stellar Testnet |
| **Contract ID** | `CXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` *(updated after CI/CD deploy)* |
| **Explorer** | [View on Stellar Expert](https://stellar.expert/explorer/testnet) |
| **Build Target** | `wasm32-unknown-unknown` |

### Contract Functions

```rust
// Initialize the contract with an owner
fn init(env: Env, owner: Address)

// Get the owner address
fn get_owner(env: Env) -> Address

// Get total number of tips recorded
fn get_tip_count(env: Env) -> u32

// Record a tip event (emits on-chain event)
fn tip(env: Env, sender: Address, amount: i128, message: Symbol)
```

### Contract Source Code

```rust
// contracts/src/lib.rs
#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, symbol_short, Env, Symbol, Address, log};

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
        env.storage().persistent().get(&DataKey::Owner).expect("Not initialized")
    }

    pub fn get_tip_count(env: Env) -> u32 {
        env.storage().persistent().get(&DataKey::TipCount).unwrap_or(0)
    }

    pub fn tip(env: Env, sender: Address, amount: i128, message: Symbol) {
        sender.require_auth();
        if amount <= 0 { panic!("Amount must be positive"); }
        let count: u32 = env.storage().persistent().get(&DataKey::TipCount).unwrap_or(0);
        env.storage().persistent().set(&DataKey::TipCount, &(count + 1));
        env.events().publish((symbol_short!("tip"), sender.clone()), (amount, message));
        log!(&env, "Tip recorded: sender={}, amount={}", sender, amount);
    }
}
```

### Build the Contract Locally

> **Prerequisites:** Linux/macOS or WSL on Windows (MSVC linker not required on Linux)

```bash
# Navigate to contracts directory
cd contracts

# Add wasm target (one-time setup)
rustup target add wasm32-unknown-unknown

# Run tests
cargo test

# Build WASM binary
cargo build --target wasm32-unknown-unknown --release

# Output: contracts/target/wasm32-unknown-unknown/release/stellar_tipjar_contract.wasm
```

### Deploy the Contract Manually

```bash
# Install Stellar CLI
curl -L https://github.com/stellar/stellar-cli/releases/latest/download/stellar-cli-x86_64-unknown-linux-gnu.tar.gz | tar xz
sudo mv stellar /usr/local/bin/

# Configure testnet
stellar network add testnet \
  --rpc-url https://soroban-testnet.stellar.org \
  --network-passphrase "Test SDF Network ; September 2015"

# Generate and fund deployer account
stellar keys generate deployer --network testnet
curl "https://friendbot.stellar.org?addr=$(stellar keys address deployer)"

# Deploy contract
stellar contract deploy \
  --wasm contracts/target/wasm32-unknown-unknown/release/stellar_tipjar_contract.wasm \
  --source deployer \
  --network testnet

# Initialize contract (replace CONTRACT_ID and OWNER_ADDRESS)
stellar contract invoke \
  --id <CONTRACT_ID> \
  --source deployer \
  --network testnet \
  -- init \
  --owner <OWNER_ADDRESS>

# Verify deployment
stellar contract invoke \
  --id <CONTRACT_ID> \
  --source deployer \
  --network testnet \
  -- get_owner
```

### Automated CI/CD Deployment

The contract is automatically built and deployed via **GitHub Actions** on every push to `main`.

See [`.github/workflows/smart-contract.yml`](.github/workflows/smart-contract.yml) for the full pipeline.

Pipeline steps:
1. ✅ Run all Rust unit tests
2. ✅ Build WASM binary
3. ✅ Upload WASM artifact
4. ✅ Deploy to Stellar Testnet (on `main` branch)
5. ✅ Initialize contract
6. ✅ Verify deployment on-chain

---

### Prerequisites

- Node.js (v18 or higher)
- Freighter Wallet browser extension — [Download here](https://freighter.app/)
- Stellar Testnet account with XLM — [Get free testnet XLM](https://laboratory.stellar.org/#account-creator?network=test)

### Setup

```bash
# Clone the repository
git clone https://github.com/Aniket24-create/StellarRiseIn_StarSend.git
cd StellarRiseIn_StarSend

# Install dependencies
npm install

# Start development server
npm run dev
```



---

## Installation

### Development Environment

```bash
# Clone repository
git clone https://github.com/Aniket24-create/StellarRiseIn_StarSend.git
cd StellarRiseIn_StarSend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Vercel
vercel --prod
```

---

## Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Stellar Network Configuration
VITE_STELLAR_NETWORK=testnet
VITE_HORIZON_URL=https://horizon-testnet.stellar.org

# Application Settings
VITE_APP_NAME=StellarRise StarSend
VITE_APP_VERSION=1.0.0
```

### Freighter Wallet Setup

1. Install Freighter — [Chrome Web Store](https://freighter.app/)
2. Create Account — Set up a new Stellar account
3. Switch to Testnet — Enable testnet in Freighter settings
4. Get Test XLM — Use [Stellar Laboratory Friendbot](https://laboratory.stellar.org/#account-creator?network=test)

---

## Architecture

### Tech Stack

| Category | Technology | Purpose |
|----------|-----------|---------|
| Frontend | React 18 + Vite | Modern React with fast build tool |
| Styling | Tailwind CSS | Utility-first CSS framework |
| Blockchain | Stellar SDK | Stellar network integration |
| Wallet | Freighter API | Secure wallet connection |
| Routing | React Router v6 | Client-side navigation |
| Icons | Lucide React | Icon library |
| QR Scanning | html5-qrcode | Camera-based QR scanning |
| Deployment | Vercel | Serverless deployment |

### Project Structure

```
StellarRiseIn_StarSend/
├── src/
│   ├── components/
│   │   ├── Hero.jsx               # Landing page
│   │   ├── Dashboard.js           # Main dashboard
│   │   ├── SendTip.js             # Send tip form
│   │   ├── Success.js             # Success screen
│   │   └── TransactionHistory.js  # Transaction list with filters
│   ├── context/
│   │   └── WalletContext.js       # Global wallet state
│   ├── App.jsx                    # App routes
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Global styles + Tailwind
├── screenshots/                   # App screenshots
├── contracts/                     # Stellar smart contracts
├── public/
├── .env.example
├── package.json
├── tailwind.config.js
├── vercel.json
└── README.md
```

### Data Flow

```
User Action
    |
    v
React Component (Dashboard / SendTip)
    |
    v
WalletContext (global state)
    |
    |---> Freighter API  (wallet signing)
    |
    └---> Stellar Horizon API  (blockchain)
              |
              v
         Stellar Testnet Network
```

---

## Development

### Available Scripts

```bash
npm run dev           # Start development server (localhost:3000)
npm run build         # Build for production
npm run preview       # Preview production build
npm run lint          # Run ESLint
npm run lint:fix      # Auto-fix ESLint errors
```

### Commit Message Convention

```
feat:     New feature
fix:      Bug fix
ui:       UI/UX improvement
docs:     Documentation update
refactor: Code refactor (no feature change)
chore:    Build / config changes
```

---

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Aniket24-create/StellarRiseIn_StarSend)

Manual Vercel deploy:

```bash
npm i -g vercel
vercel --prod
```



---

## API Reference

### Wallet Context

```js
const {
  isWalletConnected,   // boolean - is wallet connected?
  isSimulated,         // boolean - is this demo mode?
  publicKey,           // string  - user's Stellar public key
  balance,             // string  - XLM balance
  loading,             // boolean - async operation in progress
  transactions,        // array   - local transaction history
  connectWallet,       // fn()    - connect Freighter wallet
  simulateConnection,  // fn()    - enter demo mode
  sendPayment,         // fn(destination, amount, memo) -> result
  shortenAddress,      // fn(address) -> "GABC...XYZ1"
  fetchBalance,        // fn(publicKey) -> void
  disconnectWallet,    // fn()    - disconnect and clear state
} = useWallet();
```

### sendPayment

```js
// Returns: { hash: string }
const result = await sendPayment(
  'GDEST...ADDRESS',  // Stellar destination address
  '5',                // Amount in XLM (string)
  'Great work!'       // Optional memo (max 28 chars)
);
```

---

## Roadmap

### v1.0.0 - MVP (Current)
- Basic tipping via Freighter
- Real-time balance + USD display
- Transaction history with search and filters
- QR code scanner for addresses
- Username alias system (@username)
- Gasless mode toggle
- Demo / simulation mode
- Testnet deployment on Vercel

### v1.1.0 - User Feedback Iteration (Planned)
- Copy address with visual "Copied!" feedback
- USD value shown on all XLM input fields
- Send confirmation modal before transaction
- Enhanced empty state with icon and CTA
- Memo character counter with live color

### v1.2.0 - Future Phase
- Multi-asset support (USDC, other tokens)
- QR code generation for receiving tips
- Tip scheduling / recurring tips
- Social tip leaderboard
- React Native mobile app
- Mainnet toggle

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

---

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.



---

## Acknowledgments

- Stellar Development Foundation — For the amazing Stellar network and documentation
- Freighter Team — For the secure, developer-friendly wallet extension
- Vercel — For the seamless deployment platform
- Tailwind CSS — For the utility-first styling framework
- Stellar RISE Program — For the opportunity to build and learn

---

## Support

- Email: [support@stellarrise.com](mailto:support@stellarrise.com)
- Issues: [GitHub Issues](https://github.com/Aniket24-create/StellarRiseIn_StarSend/issues)
- Live App: [starsend.vercel.app](https://starsend.vercel.app)

---

Built with dedication for the Stellar RISE hackathon.

[Back to Top](#stellarrise-starsend---decentralized-tipping-platform)
