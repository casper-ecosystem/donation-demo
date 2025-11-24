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

## What We’re Building

The Donation Demo is a practical, production-ready pattern for Casper dApps.

Users will be able to:

- Connect their wallet with **CSPR.click**
- Enter a donation amount + message
- Sign & send a CSPR transfer to a smart contract
- Store the donation on-chain
- Emit a CES-compatible event
- Have the event indexed by **CSPR.cloud**
- View all donations through a simple frontend backed by a Node.js API

---

## CSPR Suite Tools Used

This demo uses several tools from the **CSPR Suite**:

| Product | Purpose |
|--------|---------|
| **CSPR.click** | Wallet connection & transaction signing |
| **CSPR.cloud** | Event indexing & blockchain API |
| **CSPR.design** | React UI component library for Casper ecosystem |
| **CSPR.build** | Console where developers get their CSPR.click and CSPR.cloud keys |
| **Odra Framework** | Rust framework for Casper smart contracts |
| **Casper JS SDK** | JavaScript SDK for interacting with the Casper Network |

These tools remove boilerplate and help you build robust, ecosystem-aligned dApps.

---

## Tutorial Structure

1. **Getting Started**
2. **Building the Frontend Interface**
3. **Writing the Smart Contract Using Odra**
4. **Setting Up the Node.js Backend Using CSPR.cloud**

---

## Prerequisites

Before you start, ensure you have:

- Basic understanding of **JavaScript / TypeScript**
- Basic understanding of **React**
- **Node.js**: Version 20.12.0 or higher
- **npm**: Version 8.x or higher
- **MySQL**: Version 8.0 or higher
- **CSPR.cloud API Key**: Obtain from [CSPR.build Console](https://console.cspr.build)

You will also need the following:

### CSPR.build Account
Create an account at [**CSPR.build Console**]((https://console.cspr.build)) - this is where you generate:

- Your **CSPR.click App ID**
- Your **CSPR.cloud Access Token**

Both will be required later for environment configuration.
