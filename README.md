# Tip the barista Demo dApp

This is a simple dApp that demonstrates how to use [CSPR.click](https://cspr.click) for authentication and interaction with wallets. It also shows how to use [CSPR.cloud](https://cspr.cloud) for indexing smart contract events. And how to write a simple smart contract using [Odra](https://github.com/odradev/odra).

The example use case is very simple. The dApp allows users to send tips with CSPR tokens to a developer to show their appreciation. The tips are stored in a smart contract and indexed by CSPR.cloud. The dApp also provides a list of all tips sent so far.

## Run

You can run all components in the demo application using [Docker compose](https://docs.docker.com/compose/install).

Copy the `server/.env.example` to `server/.env`. The default values are fine for running the application with the contract on testnet an Docker.

```bash
docker compose -f infra/local/docker-compose.yaml --project-name lottery up -d
```

## Develop

Please, do the following steps if you want to play with the code, or if you want to use it as a starting point for your own dApp.

### CSPR.build

Register a free [CSPR.build](https://console.cspr.build) account to create CSPR.click and CSPR.cloud access keys.

### Smart contract

Build and deploy the smart contract to [Casper Testnet](https://testnet.cspr.live) as described [here](smart-contract/README.md#deploy-to-testnet). You can skip this step and use the existing [Testnet smart contract](https://testnet.cspr.live/contract-package/c447e9d334a710bc3e0a47cbea854c269e41637d7b9aa9d37a745596f651ed7a) package hash `c447e9d334a710bc3e0a47cbea854c269e41637d7b9aa9d37a745596f651ed7a`, which is already provided in the default configuration.

### Server

Follow the [Server instructions](server/README.md) to configure, build, and run the Event Listener and API.

Remember the server applications require a MySQL server to store the data. You can use the `infra/local/docker-compose.yaml` to run the database in a Docker container.

### Web Client

Follow the [Web Client instructions](client/README.md) to configure, build, and run the application.

## About Casper

[Casper](https://casper.network) is a layer 1 proof-of-stake (PoS) blockchain that prioritizes security and decentralization. Casper was built with developer needs in mind and supports features such as upgradable smart contracts or multi-signature transactions on the protocol level. Casper smart contracts are run in a WASM virtual machine, creating the possibility of using a wider variety of languages for smart contract development.

## Community

Join [Casper Developers](https://t.me/CSPRDevelopers) Telegram channel to connect with other developers.