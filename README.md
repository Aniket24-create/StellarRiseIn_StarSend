# 🪙 StarSend (StellarRiseIn)

<div align="center">
  <img src="https://img.shields.io/badge/Stellar-000000?style=for-the-badge&logo=stellar&logoColor=white" alt="Stellar" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</div>

---

## 🚀 Overview

**StarSend** is a premium, gasless micro-tipping dApp built on the **Stellar Testnet**. It allows users to send XLM tips to any Stellar address or federation alias instantly, with a focus on a seamless user experience and modern UI.

### 🔗 Quick Links
- **Live Demo:** [https://stellar-rise-in-star-send.vercel.app/](https://stellar-rise-in-star-send.vercel.app/)
- **Smart Contract Docs:** [Google Drive Reference](https://drive.google.com/file/d/157Dmtl1B84Ruxj4ppNiP84yQJXNSvqCY/view?usp=drive_link)
- **GitHub Repository:** [Aniket24-create/StellarRiseIn_StarSend](https://github.com/Aniket24-create/StellarRiseIn_StarSend)

---

## ✨ Key Features

- 💸 **Gasless Tipping** - Simulated gasless mode for zero-fee transactions.
- 🔑 **Freighter Wallet** - Seamless integration with the Freighter browser extension.
- 🌐 **Federation Support** - Resolve aliases like `@aniket` or `@john` to public keys.
- 📊 **Real-time Dashboard** - Live XLM balance and transaction history.
- 📷 **QR Code Scanner** - Quickly scan recipient addresses via camera.
- 🔓 **Demo Mode** - Test the app without needing a real wallet installed.
- 🎨 **Premium UI** - Glassmorphism design with neon accents and micro-animations.

---

## 📸 Screenshots

<div align="center">
  <table>
    <tr>
      <td align="center"><b>Landing Page</b></td>
      <td align="center"><b>Dashboard</b></td>
    </tr>
    <tr>
      <td><img src="screenshots/ui%20page%20.png" width="400px" /></td>
      <td><img src="screenshots/ui%20page%202.png" width="400px" /></td>
    </tr>
    <tr>
      <td align="center"><b>Wallet Connection</b></td>
      <td align="center"><b>Payment Confirmation</b></td>
    </tr>
    <tr>
      <td><img src="screenshots/wallect%20connction%20.png" width="400px" /></td>
      <td><img src="screenshots/pay%20conff.png" width="400px" /></td>
    </tr>
    <tr>
      <td align="center"><b>Payment Successful</b></td>
      <td align="center"><b>Transaction History</b></td>
    </tr>
    <tr>
      <td><img src="screenshots/payment%20successfuly.png" width="400px" /></td>
      <td><img src="screenshots/connection.png" width="400px" /></td>
    </tr>
  </table>
</div>

---

## 🏗️ Technical Architecture

### Frontend Stack
- **Framework:** React.js
- **Styling:** Tailwind CSS + Lucide Icons
- **Blockchain:** `@stellar/stellar-sdk`
- **Wallet:** `@stellar/freighter-api`
- **Routing:** React Router v6

### Smart Contract (Soroban)
The project includes a Rust-based smart contract located in the `/contracts` folder.
- **`init`**: Initialize the TipJar with an owner address.
- **`tip`**: Log a tipping event on the Stellar ledger.
- **`get_owner`**: Retrieve the current TipJar owner.

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9
- [Freighter Wallet](https://freighter.app/) extension (optional if using Demo Mode)

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Aniket24-create/StellarRiseIn_StarSend.git
   cd StellarRiseIn_StarSend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run locally:**
   ```bash
   npm start
   ```

---

## 🔒 Security & Environment
- **Network:** Configured for **Stellar Testnet**.
- **Non-Custodial:** StarSend never stores or accesses your private keys.
- **CI/CD:** Automated deployments via GitHub Actions and Vercel.

---

<div align="center">
  <sub>Built with ❤️ for the Stellar Ecosystem</sub>
</div>
