# GitHub Repository Setup Script for StellarRise StarSend (PowerShell)
# This script helps set up the GitHub repository and push the code

Write-Host "🐙 GitHub Repository Setup for StellarRise StarSend" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

# Function to print colored output
function Write-Status {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

# Check if git is installed
function Test-Git {
    try {
        $gitVersion = git --version
        Write-Success "Git is installed: $gitVersion"
        return $true
    }
    catch {
        Write-Error "Git is not installed. Please install Git and try again."
        return $false
    }
}

# Initialize git repository if not already initialized
function Initialize-Git {
    if (-not (Test-Path ".git")) {
        Write-Status "Initializing Git repository..."
        git init
        Write-Success "Git repository initialized"
    }
    else {
        Write-Success "Git repository already exists"
    }
}

# Set up git configuration
function Set-GitConfig {
    Write-Status "Setting up Git configuration..."
    
    # Check if user name is set
    $userName = git config user.name
    if (-not $userName) {
        $gitUsername = Read-Host "Enter your Git username"
        git config user.name $gitUsername
    }
    
    # Check if user email is set
    $userEmail = git config user.email
    if (-not $userEmail) {
        $gitEmail = Read-Host "Enter your Git email"
        git config user.email $gitEmail
    }
    
    Write-Success "Git configuration set up"
}

# Add remote origin
function Add-Remote {
    $repoUrl = "https://github.com/Aniket24-create/StellarRiseIn_StarSend.git"
    
    try {
        $existingRemote = git remote get-url origin 2>$null
        if ($existingRemote) {
            Write-Warning "Remote origin already exists. Updating..."
            git remote set-url origin $repoUrl
        }
    }
    catch {
        Write-Status "Adding remote origin..."
        git remote add origin $repoUrl
    }
    
    Write-Success "Remote origin set to: $repoUrl"
}

# Stage all files
function Add-Files {
    Write-Status "Staging files for commit..."
    
    git add .
    
    Write-Host ""
    Write-Status "Git status:"
    git status --short
    Write-Host ""
    
    Write-Success "Files staged successfully"
}

# Create initial commit
function New-Commit {
    Write-Status "Creating initial commit..."
    
    # Check if there are any changes to commit
    $changes = git diff --cached --name-only
    if (-not $changes) {
        Write-Warning "No changes to commit"
        return
    }
    
    $commitMessage = @"
🚀 Initial commit: StellarRise StarSend - Decentralized Tipping Platform

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

Ready for production deployment! 🎉
"@
    
    git commit -m $commitMessage
    Write-Success "Initial commit created"
}

# Push to GitHub
function Push-ToGitHub {
    Write-Status "Pushing to GitHub..."
    
    git branch -M main
    git push -u origin main
    
    Write-Success "Code pushed to GitHub successfully!"
}

# Create development branch
function New-DevBranch {
    Write-Status "Creating development branch..."
    
    git checkout -b develop
    git push -u origin develop
    
    # Switch back to main
    git checkout main
    
    Write-Success "Development branch created and pushed"
}

# Display next steps
function Show-NextSteps {
    Write-Host ""
    Write-Success "🎉 Repository setup completed successfully!"
    Write-Host ""
    Write-Host "📋 Next Steps:" -ForegroundColor Cyan
    Write-Host "1. Visit: https://github.com/Aniket24-create/StellarRiseIn_StarSend"
    Write-Host "2. Set up branch protection rules for main branch"
    Write-Host "3. Configure GitHub Secrets for CI/CD:"
    Write-Host "   - VERCEL_TOKEN"
    Write-Host "   - VERCEL_ORG_ID"
    Write-Host "   - VERCEL_PROJECT_ID"
    Write-Host "4. Enable GitHub Pages (if needed)"
    Write-Host "5. Set up issue templates"
    Write-Host "6. Configure repository settings"
    Write-Host ""
    Write-Host "🚀 Deployment:" -ForegroundColor Cyan
    Write-Host "- Push to 'develop' branch for staging deployment"
    Write-Host "- Push to 'main' branch for production deployment"
    Write-Host "- Use npm run deploy for manual deployment"
    Write-Host ""
    Write-Host "📚 Documentation:" -ForegroundColor Cyan
    Write-Host "- README.md - Main project documentation"
    Write-Host "- CONTRIBUTING.md - Contribution guidelines"
    Write-Host "- DEPLOYMENT.md - Deployment instructions"
    Write-Host ""
}

# Main execution
try {
    Write-Host ""
    Write-Status "Starting GitHub repository setup..."
    
    if (-not (Test-Git)) {
        exit 1
    }
    
    Initialize-Git
    Set-GitConfig
    Add-Remote
    Add-Files
    New-Commit
    Push-ToGitHub
    New-DevBranch
    Show-NextSteps
}
catch {
    Write-Error "An error occurred: $($_.Exception.Message)"
    exit 1
}