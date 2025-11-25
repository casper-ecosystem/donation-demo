# Building a Full-Stack dApp on the Casper Network

Welcome to the **Donation Demo** tutorial — a complete, step-by-step guide that teaches you how to build a **full-stack decentralized application (dApp)** on the **Casper Network** using modern tools from the **CSPR Suite**.

By the end of this tutorial, you will learn how to:

- Build a **React** frontend with wallet connection using **CSPR.click**
- Write an **Odra smart contract** that accepts donations
- Use **CSPR.cloud** to index blockchain events
- Build a **Node.js backend** that consumes events and exposes a REST API
- Combine everything into a clean full-stack Casper dApp

This tutorial is designed for **ecosystem developers** who want to learn how to structure real Casper applications by following a working, fully functional example.

---

## What We're Building

The **Donation Demo** is a practical, production-ready pattern for Casper dApps that demonstrates event-driven architecture.

### User Features

Users will be able to:

- ✅ Connect their wallet with **CSPR.click** (supports Casper Wallet, Ledger, MetaMask)
- ✅ Enter a donation amount and message
- ✅ Sign & send a CSPR transfer to a smart contract
- ✅ Have the donation stored on-chain with event emission
- ✅ View all donations through a responsive frontend
- ✅ See real-time updates as new donations arrive

### Architecture Highlights

This demo showcases:

- **Client / Frontend:** React + CSPR.click + CSPR.design
- **Smart Contract:** Rust + Odra Framework
- **Event Indexing:** CSPR.cloud real-time streaming
- **Backend:** Node.js + Express + TypeORM + MySQL
- **Real-time Updates:** WebSocket event listener

### Live Demo

> 🌐 **Try it live:** [donation-demo.casper.network](https://donation-demo.casper.network)

---

## CSPR Suite Tools Used

This demo uses several tools from the **CSPR Suite** – a collection of developer tools that eliminate boilerplate and accelerate Casper dApp development.

| Product | Purpose | When to Use | Documentation |
|---------|---------|-------------|---------------|
| **CSPR.click** | Wallet connection & transaction signing | Every dApp needs this for user authentication and transaction submission | [docs.cspr.click](https://docs.cspr.click) |
| **CSPR.cloud** | Event indexing & blockchain API | When you need to query blockchain data efficiently or display historical events | [docs.cspr.cloud](https://docs.cspr.cloud) |
| **CSPR.design** | React UI component library | For building ecosystem-aligned user interfaces | [cspr.design](https://cspr.design) |
| **CSPR.build** | Developer console | Managing API keys, monitoring usage, and configuring services | [console.cspr.build](https://console.cspr.build) |
| **Odra Framework** | Smart contract framework | Writing Casper smart contracts in Rust with high-level abstractions | [github.com/odradev/odra](https://odra.dev/) |
| **Casper JS SDK** | JavaScript SDK | Building transactions and interacting with the blockchain from JavaScript/TypeScript | [npm: casper-js-sdk](https://www.npmjs.com/package/casper-js-sdk) |

## Tutorial Structure

1. **[Getting Started](./01-introduction-to-building-casper-dapps.md)** *(You are here)*
2. **[Building the Frontend Interface](./02-building-the-frontend-with-cspr-click-and-react.md)**
3. **[Building Transactions](./03-constructing-and-signing-casper-transactions.md)**
4. **[Writing the Smart Contract Using Odra](./04-writing-smart-contracts-with-odra.md)**
5. **[Setting Up the Node.js Backend Using CSPR.cloud](./05-building-the-backend-with-cspr-cloud-streaming.md)**

---

## Prerequisites

| Software | Minimum Version              | Purpose | Installation |
|----------|------------------------------|---------|--------------|
| **Node.js** | v20.12.0 + (LTS recommended) | Frontend & backend runtime | [nodejs.org](https://nodejs.org) |
| **npm** | v8.x+                        | Package management | Included with Node.js |
| **Rust** | v1.75.0+                     | Smart contract compilation | [rustup.rs](https://rustup.rs) |
| **MySQL** | v8.0+                        | Event database | [mysql.com](https://dev.mysql.com/downloads/) |
| **Git** | Latest                       | Version control | [git-scm.com](https://git-scm.com) |
---

## Getting Your API Keys

### Step 1: Create CSPR.build Account

1. Visit [**CSPR.build Console**](https://console.cspr.build)
2. Click "Sign Up" and create an account
3. Verify your email address

### Step 2: Generate CSPR.cloud Access Key

1. Log into CSPR.build Console
2. Go to **"CSPR.cloud keys** section
3. Click **"Create key"**
4. Copy and save your access key securely:
5. ⚠️ **Keep this secret!** Don't commit it to Git

**You'll use this key for:**
- Backend event listener (WebSocket connection)
- Optional REST API calls to CSPR.cloud

### Step 3: Create CSPR.click Application

1. In CSPR.build Console, go to **"CSPR.click keys"** section
2. Click **"Create New App"**
3. Fill in details
4. Save and copy your **App ID**

**You'll use this App ID for:**
- Frontend CSPR.click initialization
- Wallet connection configuration

You now have everything needed to start building!

---

## About Casper Network

Casper is a Proof of Stake enterprise blockchain designed to help enterprises build blockchain-enabled products and services, featuring upgradeable smart contracts, developer-friendly features, and lower transaction costs than most Layer-1 blockchain offerings. Key features include:

- **Upgradeable Smart Contracts**: Modify contracts post-deployment without complex migrations
- **Developer-Friendly**: Supports Rust and other mainstream languages via WebAssembly
- **Enterprise-Ready**: Multi-signature transactions and weighted key permissions at protocol level
- **Predictable Costs**: Stable gas fees during high network activity

---

## Ready to Start?

### Next Steps

**[→ Continue to Part 2: Building the Frontend Interface](./02-building-the-frontend-with-cspr-click-and-react.md)**

---

## Resources

- [Casper Network](https://casper.network) - Official website
- [CSPR.build Console](https://console.cspr.build) - Developer tools access
- [CSPR.cloud Documentation](https://docs.cspr.cloud/) - API reference
- [Testnet Explorer](https://testnet.cspr.live) - View transactions and contracts
- [Odra Framework](https://odra.dev/) - Smart contract development
- [CSPR.click Documentation](https://docs.cspr.click) - Unified SDK that simplifies Web3 application onboarding
- [CSPR Design System](https://cspr.design/) - CSPR.suite UI components library for React applications

## Community & Support
Join [Casper Developers](https://t.me/CSPRDevelopers) Telegram channel to connect with other developers.
