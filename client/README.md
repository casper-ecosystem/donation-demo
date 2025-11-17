# tip-the-barista

# Donation demo Client

## Setup

See `client/public/config.js` file to update your own configuration.
For example to change `DONATION_CONTRACT_PACKAGE_HASH` if you deployed your own contract. If you want to use the donation application contract, keep the default value.

```bash
npm install
```

## Build

To build the project for production, run:

```bash
npm run build
```

This command will create a build folder with optimized production-ready files.

## Run

```bash
npm run start
```

## Docker Setup

To run the application using Docker, follow these steps:

1. Build the Docker image using the provided `client.dockerfile`:
2. Inside `infra/local/docker-compose.yaml` run client container and your client app should be visible through port:3000

Whether your run client app with docker or locally, the app should be visible through port:3000
