# Building the Front-End Interface

In this section, you will set up the frontend part of your Casper dApp using:

- **React**
- **CSPR.click** (for wallet connection & signing)
- **Casper JS SDK**
- Optionally **CSPR.design** for UI

To make things easy, we'll use an official React template that already includes all the Casper–specific setup you need.

---

## 1. Create a New React Application

The recommended way to start a new Casper-enabled frontend is to use the official CSPR.click React template:

```bash
npx create-react-app client --template @make-software/csprclick-react
```

This template gives you, out of the box:

- **CSPR.click integration**
- **Casper JS SDK** pre-installed and wired
- A pre-configured **ClickProvider** that wraps your app
- Example **wallet connect / disconnect** UI
- Basic layout and routing

Move into your project and start it:

```bash
cd client
npm start
```

Your app will be available at:

```text
http://localhost:3000
```

You now have a working Casper-aware React app, ready to be customized for your own dApp.

---

## 2. Wallet Support & CSPR.click UI

The `@make-software/csprclick-react` template comes with built-in support for multiple wallets:

- **Casper Wallet**
- **Ledger**
- **MetaMask** (for EVM-compatible flows, when applicable)

CSPR.click UI components provide:

- A **common UX** across different Casper apps
- Consistent **wallet connection flows**
- An interface for managing common dApp options or setings (e.g. themes, networks, currencies, etc.).

You'll see a **top bar / header** in the template containing:

- A "Sign In" button
- Selectors for active account / network (depending on configuration)

You may ***customize this header*** to meet your own dApp needs.

The idea is: you get a **ready-made wallet UX**, and you adapt it to your product.

---

## 3. Environment Configuration (`public/config.js`)

Most Casper dApps need **dynamic environment configuration**, such as:

- RPC URL (testnet/mainnet)
- Backend API URL
- CSPR.click App ID
- Contract package hash
- Network name

Instead of storing these in `.env`, you can expose them at runtime via:

```
public/config.js
```

### Example `public/config.js`:

```js
const config = {
  contract_package_hash: "ca0f4eedc84e03b6bc39ce664ef05dff00a96214194e706d50bfc43d84124035",
  api_url: "http://localhost:4000",
  cspr_click_app_name: "Donation Demo",
  cspr_click_app_id: "csprclick-template",
  cspr_click_providers: ['casper-wallet', 'ledger', 'metamask-snap'],
  cspr_live_url: "https://testnet.cspr.live",
  transaction_payment: "10000000000"
};
```

### Connecting `config.js` in `index.html`:

**Important:** You must add the script tag to your `index.html` to make the config available:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
  <base href="%PUBLIC_URL%/"> <!-- Note the slash at the end -->
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#000000" />
  <meta
          name="description"
          content="Web site created using CSPR.click create-react-app template"
  />
  <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
  <!--
    manifest.json provides metadata used when your web app is installed on a
    user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
  -->
  <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
  <!--
    Notice the use of %PUBLIC_URL% in the tags above.
    It will be replaced with the URL of the `public` folder during the build.
    Only files inside the `public` folder can be referenced from the HTML.

    Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
    work correctly both with client-side routing and a non-root public URL.
    Learn how to configure a non-root public URL by running `npm run build`.
  -->
  <title>CSPR.click app</title>
  <script src="/config.js"></script>
  <link rel="stylesheet" href="%PUBLIC_URL%/prism.css" />
</head>
<body>
<div id="root"></div>
<!--
  This HTML file is a template.
  If you open it directly in the browser, you will see an empty page.

  You can add webfonts, meta tags, or analytics to this file.
  The build step will place the bundled scripts into the <body> tag.

  To begin the development, run `npm start` or `yarn start`.
  To create a production bundle, use `npm run build` or `yarn build`.
-->
</body>
</html>
```

**Key points:**
- Place the `<script src="/config.js"></script>` **before** your main app script
- This ensures the config is loaded and available when your React app initializes
- The config will be accessible globally via `window.config`

### Accessing config in your app:

```ts
const config = (window as any).config;

console.log(config.api_url);
console.log(config.contract_package_hash);
console.log(config.cspr_click_app_id);
```

### Why this approach?

- You **don't need separate builds** for staging/production.
- You can deploy once and just **change `config.js`** on the server.
- Works perfectly with static hosting (Vercel, Netlify, Cloudflare).

This is now the recommended way to manage environment configuration for Casper dApps.

---

## 4. Template Overview & CSPR.click Options

The template initializes CSPR.click with configuration options similar to:

```ts
import { ClickProvider } from '@make-software/csprclick-ui';
import { CsprClickInitOptions, CONTENT_MODE } from '@make-software/csprclick-core-types';

const clickOptions: CsprClickInitOptions = {
  appName: config.cspr_click_app_name,
  appId: config.cspr_click_app_id,
  contentMode: CONTENT_MODE.IFRAME,
  providers: config.cspr_click_providers
};
```

These options are passed into the `<ClickProvider>` component that wraps your main application:

```tsx
<ClickProvider options={clickOptions}>
  <App />
</ClickProvider>
```

### Using Your Own App ID

While developing locally, you can keep using the default `csprclick-template` application identifier.

For real projects (staging/production), you should:

1. Go to **CSPR.build Console**
2. Create your own CSPR.click application
3. Copy the generated **App ID**
4. Replace `cspr_click_app_id` in `public/config.js` with your own:

```ts
appId: config.cspr_click_app_id
```

You can learn more about all available options in the  
**[CsprClickInitOptions documentation](https://docs.cspr.click/cspr.click-sdk/reference/types#csprclickinitoptions)**.

Typical things you might customize:

- `appName` - how your app is shown in wallet / consent UI
- `providers` - which wallets you want to support
- `contentMode` - how CSPR.click UI is displayed (`IFRAME` vs `POPUP` etc.)

---

## 5. Installing CSPR.design (Optional but Recommended)

To keep your dApp visually aligned with the broader Casper ecosystem, you can use **CSPR.design** - a React UI component library:

```bash
npm install @make-software/cspr-design
```

It includes:

- Buttons & icon buttons
- Inputs & text areas
- Typography components
- Cards & layout primitives (Flex, Grid)
- Modals & overlays
- Loaders / spinners

You can gradually replace the default CRA UI with CSPR.design components, or mix them with your own design system.

Example usage:

```tsx
import { Button, FlexRow } from '@make-software/cspr-design';

export const WalletConnectSection = () => (
        <FlexRow align="center" gap={16}>
          <Button>Connect Wallet</Button>
        </FlexRow>
);
```

---

## 6. Customizing the Header & Account Controls

The template typically comes with a **top bar** that includes:

- App name / logo placeholder
- **CSPR.click UI components** for:
  - Connecting / disconnecting a wallet
  - Choosing active account (if multiple)
  - Showing the connected public key
  - Potentially selecting network (testnet/mainnet) depending on configuration

For your own application, you should:

- Replace the placeholder project name with **your branding**
- Decide whether users should be able to:
  - Switch networks
  - Switch accounts
  - See extra settings (e.g., language, theme)
- Remove controls that you don't need for your dApp's UX
- Add your own navigation (e.g., "Dashboard", "My Positions", "Donations", "Admin")

### Creating a Custom Theme

You can create your own custom theme to match your brand identity. CSPR.click supports full theme customization including colors, typography, spacing, and more.

Learn how to create and apply custom themes:  
**[Create your own custom theme with CSPR.click](https://docs.cspr.click/cspr.click-sdk/react/customizing-the-top-bar/create-your-own-theme)**

The goal is to keep **wallet UX consistent** (thanks to CSPR.click UI), while giving you **full control over the app layout and user journey**.

---

## 7. Summary

By using the official React project template, you get:

- A fully working **React** app
- Preconfigured **CSPR.click** integration
- Multi-wallet support:
  - Casper Wallet
  - Ledger
  - MetaMask (where relevant)
- **Casper JS SDK** already installed and ready to use
- CSPR.click UI components for:
  - Connecting wallets
  - Managing accounts and settings
- A flexible header/top bar that you can customize for your own UX
- Optional **CSPR.design** for ecosystem-aligned UI components

From here, the next steps in your own project typically are:

- Wiring the frontend to your **smart contract** (via Casper JS SDK)
- Calling contract entry points (e.g. `donate`, `stake`, `vote`)
- Connecting to your **backend API** for off-chain / indexed data

You now have a solid, **reusable frontend foundation** for any Casper dApp.

--- 

### Next Steps

**[→ Continue to Part 3: Constructing and sign CSPR transactions](./03-constructing-and-signing-casper-transactions.md)**

---

## Resources

- **CSPR.click Documentation**: [https://docs.cspr.click](https://docs.cspr.click)
- **CSPR Design System**: [https://cspr.design/](https://cspr.design/)
- **Casper JS SDK**: [https://github.com/casper-ecosystem/casper-js-sdk](https://github.com/casper-ecosystem/casper-js-sdk)

## Community & Support
Join [Casper Developers](https://t.me/CSPRDevelopers) Telegram channel to connect with other developers.
