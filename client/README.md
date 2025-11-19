# Tip the Barista - Web Client

A modern React 18 frontend application that provides an intuitive interface for tipping developers on the Casper blockchain. Built with the CSPR.click authentication system and CSPR Design System components.

## Features

- **Seamless Wallet Integration**: Connect with all major Casper wallets via CSPR.click
- **Easy Tipping**: Send CSPR tokens with personalized messages
- **Tip History**: View all tips sent and received with real-time updates
- **Modern UI**: Built with CSPR Design System for consistent, professional design
- **Fast & Responsive**: Optimized React 18 performance with modern tooling

## Technology Stack

- **Framework**: React 18 with hooks and modern patterns
- **Build Tool**: Vite for lightning-fast development and optimized production builds
- **Authentication**: [CSPR.click](https://cspr.click) for wallet connection and signing
- **UI Components**: [CSPR Design System](https://design.casper.network/) for professional UI
- **Blockchain SDK**: [casper-js-sdk](https://github.com/casper-ecosystem/casper-js-sdk) for transaction building
- **API Client**: Fetch API with custom hooks for backend integration

## Prerequisites

- **Node.js**: Version 18.x or higher (for optimal React 18 support)
- **npm**: Version 9.x or higher (or yarn/pnpm)
- **Backend Server**: API server must be running (see [server README](../server/README.md))
- **CSPR.click App ID**: Register your app at [CSPR.build Console](https://console.cspr.build)
- **Casper Wallet**: Users need a compatible wallet ([Casper Wallet](https://www.casperwallet.io/), [Ledger](https://www.ledger.com/), etc.)

## Configuration

Before building and running the client application, please update the configuration in `public/config.js` to match your environment.

1. Change `donation_contract_package_hash` if you deployed your own contract. If you want to use the donation smart contract deployed on testnet, keep the default value.
2. Change `cspr_click_app_id` to your CSPR.click application id obtained from [CSPR.build Console](https://console.cspr.build).

The rest of the configuration values can be left as is most of the time.


## Installation

Install all dependencies:

```bash
npm install
```

This installs React, CSPR.click UI components, Casper JS SDK, and all required libraries.

## Development

### Start Development Server

```bash
npm run start
```

The application will be available at:
- **Local**: `http://localhost:3000`


### Development Workflow

1. **Start Backend Services** (if not already running):
   ```bash
   cd ../server
   npm run api:dev        # Terminal 1
   npm run event-handler:dev  # Terminal 2
   ```

2. **Start Frontend**:
   ```bash
   cd ../client
   npm run start            # Terminal 3
   ```

3. **Open Browser**: Navigate to `http://localhost:3000`





## Resources

- **CSPR.click Documentation**: [https://docs.cspr.click](https://docs.cspr.click)
- **CSPR Design System**: [https://use.cspr.design/](https://use.cspr.design/)
- **Casper JS SDK**: [https://github.com/casper-ecosystem/casper-js-sdk](https://github.com/casper-ecosystem/casper-js-sdk)
- **React Documentation**: [https://react.dev](https://react.dev)
- **Vite Documentation**: [https://vitejs.dev](https://vitejs.dev)

## Community & Support
Need help?

- 📖 Check the [full documentation](../README.md)
- 🐛 [Open an issue](https://github.com/your-repo/issues)
- 💬 Join [Casper Developers Telegram](https://t.me/CSPRDevelopers)
- 📧 Contact support at [CSPR.build](https://console.cspr.build)
