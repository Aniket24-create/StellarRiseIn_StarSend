# Contributing to StellarRise StarSend

First off, thank you for considering contributing to StellarRise StarSend! It's people like you that make this project great.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps which reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed after following the steps**
- **Explain which behavior you expected to see instead and why**
- **Include screenshots and animated GIFs if possible**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the steps**
- **Describe the current behavior and explain which behavior you expected to see instead**
- **Explain why this enhancement would be useful**

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue that pull request!

## Development Process

### Setting Up Your Development Environment

```bash
# Clone your fork
git clone https://github.com/your-username/StellarRiseIn_StarSend.git
cd StellarRiseIn_StarSend

# Add upstream remote
git remote add upstream https://github.com/Aniket24-create/StellarRiseIn_StarSend.git

# Install dependencies
npm install

# Start development server
npm run dev
```

### Making Changes

1. Create a new branch for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit them:
   ```bash
   git add .
   git commit -m "Add your descriptive commit message"
   ```

3. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

4. Create a Pull Request from your fork to the main repository

### Coding Standards

- Use ES6+ features
- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Ensure your code is properly formatted (we use Prettier)

### Testing

- Write tests for new features
- Ensure all tests pass before submitting PR
- Include both unit and integration tests where appropriate

## Project Structure

```
src/
├── components/          # React components
├── context/            # React context providers
├── hooks/              # Custom React hooks
├── services/           # API and external services
├── utils/              # Utility functions
├── styles/             # Global styles
└── __tests__/          # Test files
```

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` A new feature
- `fix:` A bug fix
- `docs:` Documentation only changes
- `style:` Changes that do not affect the meaning of the code
- `refactor:` A code change that neither fixes a bug nor adds a feature
- `test:` Adding missing tests or correcting existing tests
- `chore:` Changes to the build process or auxiliary tools

Example:
```
feat: add transaction filtering functionality
fix: resolve wallet connection timeout issue
docs: update API documentation
```

## Questions?

Don't hesitate to ask questions! You can:
- Open an issue with the `question` label
- Join our Discord community
- Email us at support@stellarrise.com

Thank you for contributing! 🚀