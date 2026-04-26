# Stellar TipJar dApp

A modern, dark-themed decentralized application for sending XLM tips on the Stellar network. Built with React.js, Tailwind CSS, and integrated with Freighter wallet.

## Features

- 🌟 **Modern Dark UI** - Clean, gradient-based design with blue/purple accents
- 💰 **Wallet Integration** - Connect with Freighter wallet
- 📊 **Balance Display** - Real-time XLM balance with USD conversion
- 💸 **Send Tips** - Easy tip sending with predefined amounts (1, 5, 10 XLM)
- 📱 **Responsive Design** - Works on desktop and mobile
- 📈 **Transaction History** - Track all your tip transactions
- ✅ **Success Screens** - Beautiful confirmation with Stellar Explorer links
- 🔒 **Testnet Safe** - Built for Stellar testnet

## Prerequisites

Before running this application, make sure you have:

1. **Node.js** (v16 or higher)
2. **Freighter Wallet** browser extension installed
3. **Stellar testnet account** with XLM balance

### Setting up Freighter Wallet

1. Install [Freighter Wallet](https://freighter.app/) browser extension
2. Create or import a Stellar account
3. Switch to **Testnet** in Freighter settings
4. Get testnet XLM from [Stellar Laboratory Friendbot](https://laboratory.stellar.org/#account-creator?network=test)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd stellar-tipjar
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## Usage

### 1. Connect Wallet
- Click "Connect Wallet" on the landing page
- Approve the connection in Freighter wallet

### 2. View Dashboard
- See your XLM balance and wallet address
- Use quick tip buttons for common amounts

### 3. Send Tips
- Enter recipient's Stellar address
- Choose amount (or use quick buttons)
- Add optional memo
- Confirm transaction in Freighter

### 4. Track History
- View all your tip transactions
- Click "View" to see transaction on Stellar Explorer

## Project Structure

```
src/
├── components/
│   ├── LandingPage.js      # Welcome screen with wallet connection
│   ├── Dashboard.js        # Main dashboard with balance and actions
│   ├── SendTip.js         # Send tip form with validation
│   ├── Success.js         # Transaction success screen
│   └── TransactionHistory.js # Transaction history list
├── context/
│   └── WalletContext.js   # Wallet state management and Stellar SDK integration
├── App.js                 # Main app with routing
├── index.js              # React entry point
└── index.css             # Tailwind CSS and custom styles
```

## Key Technologies

- **React.js** - Frontend framework
- **Tailwind CSS** - Utility-first CSS framework
- **Stellar SDK** - Blockchain interaction
- **Freighter API** - Wallet integration
- **React Router** - Navigation
- **Lucide React** - Modern icons

## Stellar Integration

The app uses Stellar SDK to:
- Connect to Stellar Testnet
- Load account balances
- Create and sign transactions
- Submit payments to the network

All transactions are processed on **Stellar Testnet** for safe testing.

## Customization

### Styling
- Colors and gradients are defined in `tailwind.config.js`
- Custom components are in `src/index.css`
- Font families: Inter and Poppins from Google Fonts

### Network Configuration
- Currently configured for Stellar Testnet
- To switch to Mainnet, update the network configuration in `WalletContext.js`

## Security Notes

- This app is designed for **testnet use only**
- Always verify recipient addresses before sending
- Keep your Freighter wallet secure
- Never share your secret keys

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly on testnet
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues or questions:
- Check Freighter wallet is installed and unlocked
- Ensure you're on Stellar testnet
- Verify you have sufficient XLM balance
- Check browser console for error messages

---

**Built with ❤️ for the Stellar ecosystem**