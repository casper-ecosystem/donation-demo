# TipTheBarista

A simple smart contract for the tips demo dApp.

## Entry Points (Contract Functions)

### `tip_the_barista`

Sends a tip to the contract owner. The tip must be at least 10 CSPR.

| Arguments | Description                                                               |
|-----------|---------------------------------------------------------------------------|
| `amount`  | The amount of CSPR to send to the contract owner.                         |
| `praise`  | A short message of appreciation to include with your tip for the barista. |

## Events

### `Tip`

Emitted when a tip is sent.

| Arguments | Description                                            |
|-----------|--------------------------------------------------------|
| `sender`  | Public key of the sender.                              |
| `amount`  | The amount of CSPR sent to the barista.                |
| `praise`  | A short message of appreciation included with the tip. |

## Usage

It's required to install [cargo-odra](https://github.com/odradev/cargo-odra) and [just](https://github.com/casey/just) first.

### Build

```
$ just build-contracts
```

### Test

To run tests on your local machine, run the following command:

```
$ just test
```

### Test with NCTL

NCTL is a tool for managing local Casper networks. It's used for testing smart contracts before deploying them to the testnet/mainnet.

We recommend using Casper's NCTL in a docker container:

```
$ just nctl-up
```

Before running the tests, you need to copy some user keys from the NCTL container to the `user-*-keys` folders:

```
$ just nctl-copy-keys
```

Also, create an `.env` file in the root of the project. You can use the `.env.example` file as a template to work with NCTL.

```
cp .env.example .env
```

To deploy the contract to the local Casper network, run the following command:

```
$ just cli deploy
```

To send a tip, run the following command:

```
$ just cli scenario tip --amount 10000000000 --praise "Great\ job\ dear\ barista."
```

### Deploy to Testnet

To deploy the contract to the testnet, you need to update the `.env` file with the testnet credentials. Modify the following lines:

```bash
ODRA_CASPER_LIVENET_NODE_ADDRESS=https://node.testnet.casper.network/rpc
ODRA_CASPER_LIVENET_CHAIN_NAME=casper-test
ODRA_CASPER_LIVENET_SECRET_KEY_PATH=./your_testnet_key.pem
```

And then run the following command:

```
$ just cli deploy
```
