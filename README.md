# Tip the Barista Demo dApp

A demonstration application showcasing how to build a full-stack dApp on the Casper Network. This example implements a simple tipping system where users can send CSPR tokens to developers as appreciation.

## What You'll Learn

This demo demonstrates:

- **Authentication & Wallet Integration**: Using CSPR.click, a Web3 authentication layer that integrates with all Casper ecosystem wallets
- **Blockchain Data Indexing**: Using CSPR.cloud, an enterprise-grade middleware platform that provides access to indexed and enriched blockchain data with real-time streaming
- **Smart Contract Development**: Writing contracts with [Odra framework](https://github.com/odradev/odra)
- **Event Handling**: Listening to and indexing smart contract events
- **Full-Stack Architecture**: Connecting frontend, backend, and blockchain components

## Prerequisites

Before you begin, ensure you have:

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) installed
- [CSPR.build](https://console.cspr.build) account for API access keys
- Node.js and npm (for local development)

## Quick Start with Docker

The fastest way to run the complete application:

1. **Configure environment variables**:
   ```bash
   cp server/.env.example server/.env
   ```
   The default values work for testnet deployment with Docker.

2. **Launch all services**:
   ```bash
   docker compose -f infra/local/docker-compose.yaml --project-name tip-barista up -d
   ```

This starts the database, event listener, API server, and web client.

## Development Setup

### 1. Register for API Access

Create a free account at [CSPR.build](https://console.cspr.build) to obtain:
- CSPR.click access keys (for wallet authentication)
- CSPR.cloud access keys (for blockchain data indexing)

### 2. Smart Contract

You have two options:

**Option A: Use the deployed contract** (recommended for testing)
- Package hash: `c447e9d334a710bc3e0a47cbea854c269e41637d7b9aa9d37a745596f651ed7a`
- View on [Testnet Explorer](https://testnet.cspr.live/contract-package/c447e9d334a710bc3e0a47cbea854c269e41637d7b9aa9d37a745596f651ed7a)
- Already configured in default settings

**Option B: Deploy your own contract**
- Follow the [smart contract deployment guide](smart-contract/README.md#deploy-to-testnet)
- Update configuration with your new package hash

### 3. Backend Server

The server includes an event listener and REST API.

**Requirements**:
- MySQL database (use Docker Compose for local development)
- CSPR.cloud API credentials

**Setup**:
1. See detailed instructions in [server/README.md](server/README.md)
2. Configure database connection and API keys
3. Start the event listener to index smart contract events
4. Launch the API server

### 4. Frontend Client

**Setup**:
1. Follow instructions in [client/README.md](client/README.md)
2. Configure CSPR.click credentials
3. Point to your API server endpoint
4. Run the development server

## Architecture Overview

```
┌─────────────┐
│ Web Client  │ ← CSPR.click (wallet auth)
└──────┬──────┘
       │
       ↓
┌─────────────┐
│  API Server │
└──────┬──────┘
       │
       ↓
┌─────────────┐
│   MySQL DB  │ ← Event Listener ← CSPR.cloud
└─────────────┘                    (blockchain data)
       ↑
       │
┌──────────────────┐
│ Smart Contract   │
│ (Casper Testnet) │
└──────────────────┘
```

## Technology Stack

- **Blockchain**: Casper Network - a Layer-1 blockchain with upgradeable smart contracts and Proof-of-Stake consensus
- **Smart Contracts**: Odra framework (Rust-based)
- **Indexing**: CSPR.cloud API
- **Authentication**: CSPR.click
- **Backend**: Node.js/TypeScript
- **Database**: MySQL
- **Frontend**: React/TypeScript
- **Infrastructure**: Docker & Docker Compose

## Project Structure

```
.
├── client/              # React frontend application
├── server/              # Backend API and event listener
├── smart-contract/      # Odra smart contract source
└── infra/
    └── local/          # Docker Compose configuration
```

## About Casper Network

Casper is a Proof of Stake enterprise blockchain designed to help enterprises build blockchain-enabled products and services, featuring upgradeable smart contracts, developer-friendly features, and lower transaction costs than most Layer-1 blockchain offerings. Key features include:

- **Upgradeable Smart Contracts**: Modify contracts post-deployment without complex migrations
- **Developer-Friendly**: Supports Rust and other mainstream languages via WebAssembly
- **Enterprise-Ready**: Multi-signature transactions and weighted key permissions at protocol level
- **Predictable Costs**: Stable gas fees during high network activity

## Resources

- [Casper Network](https://casper.network) - Official website
- [CSPR.build Console](https://console.cspr.build) - Developer tools access
- [CSPR.cloud Documentation](https://docs.cspr.cloud/) - API reference
- [Testnet Explorer](https://testnet.cspr.live) - View transactions and contracts
- [Odra Framework](https://github.com/odradev/odra) - Smart contract development

## Community & Support
Need help?

- 📖 Check the [full documentation](../README.md)
- 🐛 [Open an issue](https://github.com/your-repo/issues)
- 💬 Join [Casper Developers Telegram](https://t.me/CSPRDevelopers)
- 📧 Contact support at [CSPR.build](https://console.cspr.build)
