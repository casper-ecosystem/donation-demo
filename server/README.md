# tip-the-barista Server

The server side consists of two applications:
- Event listener that listens to the [smart contract events](../smart-contract/README.md#events) and indexes them in a MySQL database
- REST API that provides access to the data stored in the database.

It needs a MySQL database to store the data. You can use the `infra/local/docker-compose.yaml` to run the database in a Docker container.

## Build and run

Before building and running the server application, please update the configuration. Start with copying the config template:

```bash
cp .env.example .env
```

Next, review and update as needed the configuration values contained to match your environment.
1. Change `DONATION_CONTRACT_PACKAGE_HASH` if you deployed your own contract. If you want to use the donation smart contract deployed on testnet, keep the default value.
2. Change `CSPR_CLOUD_ACCESS_KEY` to your CSPR.cloud access key from [CSPR.build Console](https://console.cspr.build)

The rest of the configuration values can be left as is most of the time.

To install the dependencies, run:
```bash
npm install
```

To run the Event Listener, use:
```bash
npm run event-handler:dev
```

To run the API, use:
```bash
npm run api:dev
```
