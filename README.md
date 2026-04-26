<div align="center">
  
  <h1 align="center">Stellar StarSend dApp</h1>
  <p align="center">
    <strong>The Future of Instant Crypto Tipping</strong>
  </p>
  <p align="center">
    A modern, dark-themed decentralized application for sending XLM tips on the Stellar network. Built with React.js, Tailwind CSS, and seamlessly integrated with the Freighter wallet.
  </p>
  
  <div>
    <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React" />
    <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Stellar-000000.svg?style=for-the-badge&logo=Stellar&logoColor=white" alt="Stellar" />
    <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="License MIT" />
  </div>
</div>

---

## ✨ Features

- 🌟 **Modern Dark UI** - A premium, gradient-based design with vibrant blue and purple accents, glassmorphism, and smooth animations.
- 💰 **Wallet Integration** - One-click secure connection with the [Freighter](https://freighter.app/) wallet.
- 📊 **Balance Display** - Real-time XLM balance tracking with dynamic UI updates.
- 💸 **Instant Tipping** - Send tips globally in under 3 seconds with predefined amounts (1, 5, 10 XLM) or custom values.
- 📈 **Transaction History** - Track all your outgoing and incoming tips with direct links to the Stellar Block Explorer.
- 📱 **Responsive Design** - Fully optimized for desktop, tablet, and mobile devices.
- 🔒 **Testnet Safe** - Built and configured for the Stellar Testnet to allow safe experimentation.

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed before proceeding:
1. **[Node.js](https://nodejs.org/)** (v16.0.0 or higher)
2. **[Freighter Wallet](https://freighter.app/)** browser extension
3. **Stellar Testnet Account** (You can fund one using the [Friendbot](https://laboratory.stellar.org/#account-creator?network=test))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Aniket24-create/StellarRiseIn_StarSend.git
   cd StellarRiseIn_StarSend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Explore the dApp**
   Navigate to `http://localhost:3000` in your browser.

## 💡 How It Works

1. **Connect:** Click "Connect Wallet" on the landing page to securely link your Freighter wallet.
2. **Dashboard:** View your current XLM balance, wallet address, and recent activity.
3. **Send Tip:** Enter the recipient's Stellar public key, choose an amount, add an optional memo, and confirm the transaction in your wallet.
4. **Track:** Check the "History" tab to see all your past transactions on the ledger.

## 🏗️ Architecture & Stack

- **Frontend Framework:** React.js (Create React App)
- **Styling:** Tailwind CSS (Utility-first with custom CSS animations and glassmorphism)
- **Blockchain Interaction:** `@stellar/stellar-sdk`
- **Wallet Integration:** `@stellar/freighter-api`
- **Routing:** React Router v6
- **Icons:** Lucide React

```text
src/
├── components/          # Reusable UI components (Hero, Dashboard, SendTip, etc.)
├── context/             # React Context for global state (WalletContext)
├── App.js               # Main application routing and entry point
├── index.css            # Tailwind directives and custom animation classes
└── index.js             # React DOM rendering
```

## 🔐 Security & Network Notes

- **Testnet Only:** By default, this application is configured to run on the **Stellar Testnet**. Do not send real assets.
- **Non-Custodial:** The application never accesses your private keys. All transaction signing is handled securely by the Freighter extension.
- **Mainnet Configuration:** To deploy on Mainnet, update the Horizon URL and Network Passphrase in `src/context/WalletContext.js`.

## 🤝 Contributing

Contributions are welcome! If you'd like to improve the dApp:
1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---
<div align="center">
  <sub>Built with ❤️ for the decentralized future.</sub>
</div>
