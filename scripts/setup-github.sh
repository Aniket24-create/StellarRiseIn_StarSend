#!/bin/bash

# GitHub Repository Setup Script for StellarRise StarSend
# This script helps set up the GitHub repository and push the code

set -e

echo "🐙 GitHub Repository Setup for StellarRise StarSend"
echo "=================================================="

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

# Check if git is installed
check_git() {
    if ! command -v git &> /dev/null; then
        print_error "Git is not installed. Please install Git and try again."
        exit 1
    fi
    print_success "Git $(git --version | cut -d' ' -f3) is installed"
}

# Initialize git repository if not already initialized
init_git() {
    if [ ! -d ".git" ]; then
        print_status "Initializing Git repository..."
        git init
        print_success "Git repository initialized"
    else
        print_success "Git repository already exists"
    fi
}

# Set up git configuration
setup_git_config() {
    print_status "Setting up Git configuration..."
    
    # Check if user name is set
    if [ -z "$(git config user.name)" ]; then
        read -p "Enter your Git username: " git_username
        git config user.name "$git_username"
    fi
    
    # Check if user email is set
    if [ -z "$(git config user.email)" ]; then
        read -p "Enter your Git email: " git_email
        git config user.email "$git_email"
    fi
    
    print_success "Git configuration set up"
}

# Add remote origin
add_remote() {
    REPO_URL="https://github.com/Aniket24-create/StellarRiseIn_StarSend.git"
    
    # Check if remote origin exists
    if git remote get-url origin &> /dev/null; then
        print_warning "Remote origin already exists. Updating..."
        git remote set-url origin "$REPO_URL"
    else
        print_status "Adding remote origin..."
        git remote add origin "$REPO_URL"
    fi
    
    print_success "Remote origin set to: $REPO_URL"
}

# Stage all files
stage_files() {
    print_status "Staging files for commit..."
    
    # Add all files except those in .gitignore
    git add .
    
    # Show status
    echo ""
    print_status "Git status:"
    git status --short
    echo ""
    
    print_success "Files staged successfully"
}

# Create initial commit
create_commit() {
    print_status "Creating initial commit..."
    
    # Check if there are any changes to commit
    if git diff --cached --quiet; then
        print_warning "No changes to commit"
        return
    fi
    
    # Create commit with detailed message
    git commit -m "🚀 Initial commit: StellarRise StarSend - Decentralized Tipping Platform

✨ Features:
- Modern Web3-style UI with dark theme
- Freighter wallet integration
- Instant XLM tipping functionality
- Real-time transaction history
- Responsive design for all devices
- Professional CI/CD pipeline

🛠️ Tech Stack:
- React 18 + Create React App
- Tailwind CSS for styling
- Stellar SDK for blockchain integration
- Lucide React for icons
- Vercel for deployment

🔧 Setup:
- Complete project structure
- Environment configuration
- Deployment scripts
- Professional documentation
- GitHub Actions CI/CD

Ready for production deployment! 🎉"
    
    print_success "Initial commit created"
}

# Push to GitHub
push_to_github() {
    print_status "Pushing to GitHub..."
    
    # Push to main branch
    git branch -M main
    git push -u origin main
    
    print_success "Code pushed to GitHub successfully!"
}

# Create development branch
create_dev_branch() {
    print_status "Creating development branch..."
    
    git checkout -b develop
    git push -u origin develop
    
    # Switch back to main
    git checkout main
    
    print_success "Development branch created and pushed"
}

# Display next steps
show_next_steps() {
    echo ""
    print_success "🎉 Repository setup completed successfully!"
    echo ""
    echo "📋 Next Steps:"
    echo "1. Visit: https://github.com/Aniket24-create/StellarRiseIn_StarSend"
    echo "2. Set up branch protection rules for main branch"
    echo "3. Configure GitHub Secrets for CI/CD:"
    echo "   - VERCEL_TOKEN"
    echo "   - VERCEL_ORG_ID"
    echo "   - VERCEL_PROJECT_ID"
    echo "4. Enable GitHub Pages (if needed)"
    echo "5. Set up issue templates"
    echo "6. Configure repository settings"
    echo ""
    echo "🚀 Deployment:"
    echo "- Push to 'develop' branch for staging deployment"
    echo "- Push to 'main' branch for production deployment"
    echo "- Use './scripts/deploy.sh' for manual deployment"
    echo ""
    echo "📚 Documentation:"
    echo "- README.md - Main project documentation"
    echo "- CONTRIBUTING.md - Contribution guidelines"
    echo "- DEPLOYMENT.md - Deployment instructions"
    echo ""
}

# Main function
main() {
    echo ""
    print_status "Starting GitHub repository setup..."
    
    # Check prerequisites
    check_git
    
    # Set up repository
    init_git
    setup_git_config
    add_remote
    stage_files
    create_commit
    push_to_github
    create_dev_branch
    
    # Show next steps
    show_next_steps
}

# Run main function
main "$@"