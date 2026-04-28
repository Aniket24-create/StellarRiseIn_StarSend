# 🚀 Deployment Guide

This guide will help you deploy StellarRise StarSend to various platforms.

## 📋 Prerequisites

- Node.js 18+ installed
- Git repository set up
- Freighter wallet extension installed
- Stellar testnet account with XLM balance

## 🔧 Environment Setup

1. **Copy environment variables:**
   ```bash
   cp .env.example .env.local
   ```

2. **Update environment variables:**
   ```env
   REACT_APP_STELLAR_NETWORK=testnet
   REACT_APP_HORIZON_URL=https://horizon-testnet.stellar.org
   REACT_APP_NAME=StellarRise StarSend
   ```

## 🌐 Vercel Deployment (Recommended)

### Automatic Deployment

1. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables in Vercel dashboard

2. **Environment Variables in Vercel:**
   ```
   REACT_APP_STELLAR_NETWORK=testnet
   REACT_APP_HORIZON_URL=https://horizon-testnet.stellar.org
   REACT_APP_NAME=StellarRise StarSend
   REACT_APP_VERSION=1.0.0
   ```

3. **Deploy:**
   - Push to main branch
   - Vercel will automatically deploy

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
npm run deploy
```

## 🐙 GitHub Pages Deployment

1. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json:**
   ```json
   {
     "homepage": "https://yourusername.github.io/StellarRiseIn_StarSend",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

3. **Deploy:**
   ```bash
   npm run deploy
   ```

## 🌊 Netlify Deployment

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify:**
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli

   # Deploy
   netlify deploy --prod --dir=build
   ```

## 🐳 Docker Deployment

1. **Create Dockerfile:**
   ```dockerfile
   FROM node:18-alpine AS builder
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build

   FROM nginx:alpine
   COPY --from=builder /app/build /usr/share/nginx/html
   COPY nginx.conf /etc/nginx/nginx.conf
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **Build and run:**
   ```bash
   docker build -t stellar-tipjar .
   docker run -p 3000:80 stellar-tipjar
   ```

## ☁️ AWS S3 + CloudFront

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Upload to S3:**
   ```bash
   aws s3 sync build/ s3://your-bucket-name --delete
   ```

3. **Invalidate CloudFront:**
   ```bash
   aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
   ```

## 🔍 Post-Deployment Checklist

- [ ] Verify wallet connection works
- [ ] Test sending a tip transaction
- [ ] Check transaction history
- [ ] Verify responsive design on mobile
- [ ] Test all navigation routes
- [ ] Confirm environment variables are set
- [ ] Check console for errors
- [ ] Verify SSL certificate
- [ ] Test performance with Lighthouse

## 🐛 Troubleshooting

### Common Issues

1. **Wallet Connection Fails:**
   - Ensure Freighter is installed and unlocked
   - Check if testnet is selected in Freighter
   - Verify CORS settings

2. **Build Fails:**
   - Check Node.js version (18+)
   - Clear node_modules and reinstall
   - Verify all dependencies are installed

3. **Environment Variables Not Working:**
   - Ensure variables start with `REACT_APP_`
   - Restart development server after changes
   - Check Vercel dashboard for correct values

4. **Routing Issues:**
   - Verify `vercel.json` configuration
   - Check that all routes redirect to `index.html`

### Performance Optimization

1. **Bundle Analysis:**
   ```bash
   npm run analyze
   ```

2. **Optimize Images:**
   - Use WebP format
   - Compress images
   - Implement lazy loading

3. **Code Splitting:**
   - Use React.lazy() for route components
   - Implement dynamic imports

## 📊 Monitoring

### Analytics Setup

1. **Google Analytics:**
   ```env
   REACT_APP_GA_TRACKING_ID=GA_MEASUREMENT_ID
   ```

2. **Error Tracking:**
   - Set up Sentry for error monitoring
   - Configure performance monitoring

### Health Checks

- Set up uptime monitoring
- Configure performance alerts
- Monitor wallet connection success rate

## 🔄 CI/CD Pipeline

The project includes GitHub Actions for:
- Automated testing
- Code quality checks
- Security scanning
- Automatic deployment

See `.github/workflows/ci-cd.yml` for configuration.

## 📞 Support

If you encounter issues during deployment:
- Check the [troubleshooting section](#-troubleshooting)
- Open an issue on GitHub
- Join our Discord community
- Email: support@stellarrise.com