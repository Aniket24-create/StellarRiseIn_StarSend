# 🚀 Quick Setup Guide

This guide will help you set up and deploy StellarRise StarSend to GitHub and Vercel.

## 📋 Prerequisites

- [Node.js 18+](https://nodejs.org/) installed
- [Git](https://git-scm.com/) installed
- GitHub account
- [Freighter Wallet](https://freighter.app/) browser extension

## ⚡ Quick Start (5 minutes)

### 1. Clone and Setup

```bash
# Clone the repository
git clone https://github.com/Aniket24-create/StellarRiseIn_StarSend.git
cd StellarRiseIn_StarSend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm start
```

### 2. Push to Your GitHub Repository

#### Option A: Using PowerShell Script (Windows)
```powershell
# Run the setup script
.\scripts\setup-github.ps1
```

#### Option B: Manual Setup
```bash
# Initialize git (if not already done)
git init

# Add remote origin
git remote add origin https://github.com/Aniket24-create/StellarRiseIn_StarSend.git

# Add all files
git add .

# Create initial commit
git commit -m "🚀 Initial commit: StellarRise StarSend"

# Push to GitHub
git branch -M main
git push -u origin main
```

### 3. Deploy to Vercel

#### Option A: Automatic (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Select your GitHub repository
4. Configure environment variables:
   ```
   REACT_APP_STELLAR_NETWORK=testnet
   REACT_APP_HORIZON_URL=https://horizon-testnet.stellar.org
   ```
5. Click "Deploy"

#### Option B: Manual
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
npm run deploy
```

## 🔧 Environment Variables

Create a `.env.local` file with:

```env
REACT_APP_STELLAR_NETWORK=testnet
REACT_APP_HORIZON_URL=https://horizon-testnet.stellar.org
REACT_APP_NAME=StellarRise StarSend
REACT_APP_VERSION=1.0.0
```

## 🌟 Features Included

- ✅ Modern Web3 UI with dark theme
- ✅ Freighter wallet integration
- ✅ Instant XLM tipping
- ✅ Transaction history with search/filter
- ✅ Responsive design
- ✅ CI/CD pipeline with GitHub Actions
- ✅ Professional documentation
- ✅ Deployment scripts

## 📱 Testing the Application

### 1. Set up Freighter Wallet
1. Install [Freighter extension](https://freighter.app/)
2. Create or import a Stellar account
3. Switch to **Testnet** in settings
4. Get test XLM from [Stellar Laboratory](https://laboratory.stellar.org/#account-creator?network=test)

### 2. Test Features
1. **Connect Wallet** - Click "Connect Wallet" on landing page
2. **View Balance** - Check your XLM balance on dashboard
3. **Send Tip** - Try sending a small tip (0.1 XLM)
4. **View History** - Check transaction history

## 🚀 Deployment Platforms

| Platform | Status | URL | Notes |
|----------|--------|-----|-------|
| **Vercel** | ✅ Recommended | Auto-deploy from GitHub | Best performance |
| **Netlify** | ✅ Supported | Manual deployment | Good alternative |
| **GitHub Pages** | ✅ Supported | Free hosting | Basic hosting |
| **AWS S3** | ✅ Supported | Enterprise | Requires setup |

## 🔄 CI/CD Pipeline

The project includes GitHub Actions that automatically:
- ✅ Run tests on every push
- ✅ Check code quality with ESLint
- ✅ Build the project
- ✅ Deploy to staging (develop branch)
- ✅ Deploy to production (main branch)
- ✅ Run security scans

## 📚 Documentation

- **[README.md](README.md)** - Complete project documentation
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - How to contribute
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Detailed deployment guide
- **[LICENSE](LICENSE)** - MIT License

## 🐛 Troubleshooting

### Common Issues

1. **"Module not found" errors**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Wallet connection fails**
   - Ensure Freighter is installed and unlocked
   - Switch to Stellar testnet in Freighter settings
   - Check browser console for errors

3. **Build fails**
   - Check Node.js version: `node --version` (should be 18+)
   - Clear cache: `npm start -- --reset-cache`

4. **Environment variables not working**
   - Ensure variables start with `REACT_APP_`
   - Restart development server after changes

## 📞 Support

Need help? We're here for you!

- 🐛 **Issues**: [GitHub Issues](https://github.com/Aniket24-create/StellarRiseIn_StarSend/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/Aniket24-create/StellarRiseIn_StarSend/discussions)
- 📧 **Email**: support@stellarrise.com

## 🎉 Success!

If everything is working:
- ✅ Application loads without errors
- ✅ Wallet connects successfully
- ✅ You can send test tips
- ✅ Transaction history shows up
- ✅ Deployed to your chosen platform

**Congratulations! Your StellarRise StarSend is now live! 🚀**

---

**Next Steps:**
1. Customize the branding and colors
2. Add your own features
3. Set up monitoring and analytics
4. Share with the community!

Made with ❤️ by the StellarRise team