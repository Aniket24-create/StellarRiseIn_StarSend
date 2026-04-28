#!/bin/bash

# StellarRise StarSend Deployment Script
# This script helps deploy the application to various platforms

set -e

echo "🚀 StellarRise StarSend Deployment Script"
echo "========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
check_node() {
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ and try again."
        exit 1
    fi
    
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        print_error "Node.js version 18+ is required. Current version: $(node -v)"
        exit 1
    fi
    
    print_success "Node.js $(node -v) is installed"
}

# Check if npm is installed
check_npm() {
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm and try again."
        exit 1
    fi
    print_success "npm $(npm -v) is installed"
}

# Install dependencies
install_deps() {
    print_status "Installing dependencies..."
    npm ci
    print_success "Dependencies installed successfully"
}

# Run tests
run_tests() {
    print_status "Running tests..."
    npm test -- --coverage --watchAll=false
    print_success "All tests passed"
}

# Run linting
run_lint() {
    print_status "Running ESLint..."
    npm run lint
    print_success "Linting passed"
}

# Build the project
build_project() {
    print_status "Building the project..."
    npm run build
    print_success "Build completed successfully"
}

# Deploy to Vercel
deploy_vercel() {
    print_status "Deploying to Vercel..."
    
    if ! command -v vercel &> /dev/null; then
        print_warning "Vercel CLI not found. Installing..."
        npm install -g vercel
    fi
    
    if [ "$1" = "production" ]; then
        vercel --prod
        print_success "Deployed to Vercel production"
    else
        vercel
        print_success "Deployed to Vercel staging"
    fi
}

# Deploy to Netlify
deploy_netlify() {
    print_status "Deploying to Netlify..."
    
    if ! command -v netlify &> /dev/null; then
        print_warning "Netlify CLI not found. Installing..."
        npm install -g netlify-cli
    fi
    
    netlify deploy --prod --dir=build
    print_success "Deployed to Netlify"
}

# Main deployment function
main() {
    echo ""
    print_status "Starting deployment process..."
    
    # Check prerequisites
    check_node
    check_npm
    
    # Install dependencies
    install_deps
    
    # Run quality checks
    run_lint
    
    # Build project
    build_project
    
    # Ask for deployment platform
    echo ""
    echo "Select deployment platform:"
    echo "1) Vercel (Staging)"
    echo "2) Vercel (Production)"
    echo "3) Netlify"
    echo "4) Build only (no deployment)"
    echo ""
    read -p "Enter your choice (1-4): " choice
    
    case $choice in
        1)
            deploy_vercel "staging"
            ;;
        2)
            deploy_vercel "production"
            ;;
        3)
            deploy_netlify
            ;;
        4)
            print_success "Build completed. Files are in the 'build' directory."
            ;;
        *)
            print_error "Invalid choice. Exiting."
            exit 1
            ;;
    esac
    
    echo ""
    print_success "🎉 Deployment completed successfully!"
    echo ""
    echo "Next steps:"
    echo "- Test the deployed application"
    echo "- Verify wallet connection works"
    echo "- Check transaction functionality"
    echo "- Monitor for any errors"
    echo ""
}

# Run main function
main "$@"