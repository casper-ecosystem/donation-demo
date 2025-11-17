# tip-the-barista Client

The `client` project is a React 18 application that serves as the frontend for the Tip the barista dApp. It uses the CSPR.click UI library for authentication and interaction with wallets. It also uses the CSPR Design System for the UI. And the `casper-js-sdk` for building transactions.

## Build and run

Before building and running the client application, please update the configuration in `public/config.js` to match your environment.

1. Change `donation_contract_package_hash` if you deployed your own contract. If you want to use the donation smart contract deployed on testnet, keep the default value.
2. Change `cspr_click_app_id` to your CSPR.click application id obtained from [CSPR.build Console](https://console.cspr.build).

The rest of the configuration values can be left as is most of the time.

To install the dependencies, run:
```bash
npm install
```

To run the application, use:
```bash
npm run dev
```
