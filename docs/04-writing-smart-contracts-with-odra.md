# Writing Smart Contracts with the Odra Framework

This tutorial explains how to write a **Casper smart contract** using the **Odra** framework

You can treat the example as a *reference implementation* and adapt the patterns to your own project.

---

## 1. What is Odra?

[Odra](https://odra.dev/) is a Rust-based smart contract framework for Casper that provides:

- High-level abstractions over Casper host functions
- Clean patterns for **modules**, **storage**, **events**, and **errors**
- A built-in testing framework (`odra-test`)
- Tooling to **build WASM** and **generate schema** for frontends and deployment tools

Instead of dealing directly with low-level storage and URefs, you work with:

- `Var<T>` – single-value storage cells
- `Mapping<K, V>` – map-like storage
- `SubModule<T>` – nested modules for storage or logic
- `#[odra::module]`, `#[odra::event]`, `#[odra::odra_error]` – macros to define contract structure

---

## 2. Project Setup

### 2.1 Create a new project using the Odra template

```bash
cargo odra new --name my-odra-contract
cd my-odra-contract
```

This command creates a complete project structure with all necessary files pre-configured:

- `Cargo.toml` – with Odra dependencies already set up
- `Odra.toml` – contract registration file
- `build.rs` – build script for Odra's build pipeline
- `src/lib.rs` – main library file
- Source files for your contract module
- Build binaries in `bin/` directory

**You don't need to create or add any files manually** – the template contains everything you need. Simply modify the generated files to implement your contract logic.

### 2.2 Understanding the Generated Structure

After running `cargo odra new`, your project will have this structure:

```text
my-odra-contract/
  ├── Cargo.toml          # Dependencies pre-configured
  ├── Odra.toml           # Contract registration
  ├── build.rs            # Build script
  ├── bin/
  │   ├── build_schema.rs
  │   ├── build_contract.rs
  │   └── cli.rs
  └── src/
      ├── lib.rs
      └── [your_module].rs
```

### 2.3 Key Configuration Files (Pre-generated)

**Cargo.toml** – Already includes:

```toml
[dependencies]
odra = { version = "2.4.0", default-features = false }

[dev-dependencies]
odra-test = { version = "2.4.0", default-features = false }

[build-dependencies]
odra-build = { version = "2.4.0", default-features = false }

[[bin]]
name = "build_schema"
path = "bin/build_schema.rs"
test = false

[[bin]]
name = "build_contract"
path = "bin/build_contract.rs"
test = false

# ... additional configuration
```

**Odra.toml** – Registers your contract (you'll update the `fqn` to match your module):

```toml
[[contracts]]
fqn = "my_module::MyContract"
```

- `fqn` = fully-qualified name of the contract module: `module_name::StructName`.

In the **example project**, this is:

```toml
[[contracts]]
fqn = "tips::TipTheBarista"
```

**build.rs** – Already configured:

```rust
pub fn main() {
    odra_build::build();
}
```

---

## 3. Module Structure

The generated `src` directory looks like this:

```text
src/
  lib.rs
  my_module.rs
```

### 3.1 `lib.rs` (Pre-generated)

```rust
#![cfg_attr(not(test), no_std)]
#![cfg_attr(not(test), no_main)]
extern crate alloc;

pub mod my_module;
```

In the **example project**:

```rust
#![cfg_attr(not(test), no_std)]
#![cfg_attr(not(test), no_main)]
extern crate alloc;

pub mod tips;
```

The main module is `tips`, exposing the `TipTheBarista` contract.

---

## 4. Storage, Events, and Errors (General Pattern)

### 4.1 General pattern

Typical things you define in a contract:

- **Storage fields**
  - State variables: owner, balances, config values, etc.
  - Implemented with `Var<T>`, `Mapping<K, V>`, or helper macros
- **Events**
  - For external systems (like indexers) to track contract activity
- **Errors**
  - For clean, typed reverts

Odra provides macros for these:

```rust
use odra::prelude::*;
use odra::casper_types::U512;
use odra::named_keys::single_value_storage;

// Example named keys
const CONTRACT_NAME: &str = "contract_name";
const CONTRACT_DESCRIPTION: &str = "contract_description";
const CONTRACT_ICON_URI: &str = "contract_icon_uri";
const CONTRACT_PROJECT_URI: &str = "contract_project_uri";

single_value_storage!(
    ContractNameStorage,
    String,
    CONTRACT_NAME,
    ExecutionError::KeyNotFound
);

// ... more single_value_storage! as needed

#[odra::event]
pub struct ExampleEvent {
    pub sender: Address,
    pub amount: U512,
    pub message: String,
}

#[odra::odra_error]
pub enum ContractErrors {
    BelowMinimumAmount = 2001,
}
```

### 4.2 How the Example Project Uses This

In the demo project's `tips.rs`:

- The contract defines named-key storage for:
  - `CONTRACT_NAME`
  - `CONTRACT_DESCRIPTION`
  - `CONTRACT_ICON_URI`
  - `CONTRACT_PROJECT_URI`
- It defines an event:

```rust
#[odra::event]
pub struct Tip {
    pub sender: Address,
    pub amount: U512,
    pub praise: String,
}
```

- And an error for enforcing a minimum tip amount:

```rust
#[odra::odra_error]
pub enum ContractErrors {
    BelowMinimumAmount = 2001,
}
```

These are standard patterns you can reuse for **any business logic**, just changing names and fields.

---

## 5. Defining the Contract Module

### 5.1 General `#[odra::module]` pattern

A typical Odra contract module looks like:

```rust
#[odra::module(
    errors = ContractErrors,
    events = [ExampleEvent]
)]
pub struct MyContract {
    owner: Var<Address>,
    // Additional state:
    // balances: Mapping<Address, U512>,
    // config: Var<ConfigStruct>,
}
```

- `errors` attribute lists the error enum type
- `events` attribute lists event types the contract emits
- The struct fields are your **on-chain storage**

You then implement methods:

```rust
#[odra::module]
impl MyContract {
    pub fn init(&mut self) {
        let caller = self.env().caller();
        self.owner.set(caller);
    }

    #[odra(payable)]
    pub fn do_something(&mut self, message: String) {
        // logic...
    }
}
```

### 5.2 Example: `TipTheBarista` Contract

In the demo project, the contract is:

```rust
#[odra::module(
    errors = ContractErrors,
    events = [Tip]
)]
pub struct TipTheBarista {
    /// The recipient of incoming tokens.
    recipient: Var<Address>,
    contract_name: SubModule<ContractNameStorage>,
    contract_description: SubModule<ContractDescriptionStorage>,
    contract_icon_uri: SubModule<ContractIconUriStorage>,
    contract_project_uri: SubModule<ContractProjectUriStorage>,
}
```

The implementation:

```rust
#[odra::module]
impl TipTheBarista {
    /// Constructor. Initializes the contract.
    pub fn init(&mut self) {
        let caller = self.env().caller();
        self.recipient.set(caller);

        self.contract_name.set("Tip The Barista".to_string());
        self.contract_description.set(
            "A beginner-friendly smart contract that helps developers learn how to              build and deploy a basic dApp on the Casper Network."
                .to_string()
        );
        self.contract_icon_uri
            .set("https://donation-demo.casper.network/contract-icon.jpg".to_string());
        self.contract_project_uri
            .set("https://donation-demo.casper.network".to_string());
    }

    /// Payable entrypoint that forwards attached CSPR and emits a Tip event.
    #[odra(payable)]
    pub fn donate(&mut self, praise: String) {
        let cspr_amount = self.env().attached_value();

        if cspr_amount < U512::from(MINIMUM_AMOUNT) {
            self.env().revert(ContractErrors::BelowMinimumAmount);
        }

        let recipient = self.recipient.get().unwrap();
        self.env().transfer_tokens(&recipient, &cspr_amount);

        self.env().emit_event(Tip {
            sender: self.env().caller(),
            amount: cspr_amount,
            praise,
        });
    }
}
```

> You can rename `TipTheBarista`, `Tip`, and `donate` to anything you like (e.g., `StakingPool`, `Stake`, `stake`), keeping the same coding patterns.

---

## 6. Payable Entrypoints and Attached Value

### 6.1 Generic Pattern

To accept CSPR/token payments:

1. Mark the method with `#[odra(payable)]`
2. Use `self.env().attached_value()` to get the amount.
3. Optionally enforce a minimum amount.
4. Transfer tokens to some recipient (or hold them in the contract).

```rust
#[odra(payable)]
pub fn execute_action(&mut self, message: String) {
    let amount = self.env().attached_value();

    if amount < U512::from(MINIMUM_AMOUNT) {
        self.env().revert(ContractErrors::BelowMinimumAmount);
    }

    let recipient = self.owner.get().unwrap();
    self.env().transfer_tokens(&recipient, &amount);

    self.env().emit_event(ExampleEvent {
        sender: self.env().caller(),
        amount,
        message,
    });
}
```

### 6.2 How the Example Uses It

The demo's `donate` method is exactly this pattern:

- `#[odra(payable)]` – accepts CSPR
- `attached_value()` – reads the sent amount
- Compares to a **minimum threshold** (`MINIMUM_AMOUNT`)
- Transfers to `recipient` stored in contract storage
- Emits a `Tip` event

This makes the contract compatible with **CSPR.cloud event indexing**, which the backend uses to track tips.

---

## 7. Testing with `odra-test`

### 7.1 Generic Testing Approach

Odra provides a test harness that simulates:

- accounts
- balances
- contract deployment
- calls with attached tokens
- events

Basic pattern:

```rust
#[cfg(test)]
mod tests {
    use super::*;
    use odra::host::{Deployer, HostRef, NoArgs};
    use odra::casper_event_standard::EventInstance;

    #[test]
    fn it_works() {
        let env = odra_test::env();

        let user = env.get_account(1);
        let admin = env.get_account(0);

        // Deploy contract as admin
        env.set_caller(admin);
        let contract = MyContract::deploy(&env, NoArgs);

        let admin_balance_before = env.balance_of(&admin);

        // Call payable method from user with tokens
        let amount = U512::from(10_000_000_000u64);
        env.set_caller(user);

        let message = "Hello".to_string();
        let result = contract.with_tokens(amount).try_execute_action(message.clone());

        assert!(result.is_ok());

        let admin_balance_after = env.balance_of(&admin);
        assert_eq!(admin_balance_after, admin_balance_before + amount);

        // Check event emission
        assert!(env.emitted(&contract, ExampleEvent::name()));
    }
}
```

### 7.2 Example Project Test

In `tips.rs`, the test looks like:

```rust
#[cfg(test)]
mod tests {
    use super::*;
    use odra::host::{Deployer, HostRef, NoArgs};
    use odra::casper_event_standard::EventInstance;

    #[test]
    fn it_works() {
        let env = odra_test::env();

        let alice = env.get_account(1);
        let admin = env.get_account(0);

        // Deploy as admin
        env.set_caller(admin);
        let contract = TipTheBarista::deploy(&env, NoArgs);

        let admin_balance_before = env.balance_of(&admin.clone());

        // Alice sends a 10 CSPR tip
        let amount = U512::from(10_000_000_000u64);
        env.set_caller(alice);
        let praise = "Your work is inspiring. Cheers from another dev!".to_string();
        let result = contract.with_tokens(amount).try_donate(praise.clone());

        // It should succeed
        assert!(result.is_ok());

        // Admin should receive the funds
        let admin_balance_after = env.balance_of(&admin.clone());
        assert_eq!(admin_balance_after, admin_balance_before + amount);

        // And the Tip event should be emitted
        assert!(env.emitted(&contract, Tip::name()));
    }
}
```

You can copy this pattern and just change:

- Accounts involved
- Function name (e.g. `try_stake`, `try_buy`, `try_mint`)
- Event type name

---

## 8. Building the Contract and Schema

Once your contract compiles and tests pass, build the WASM and schema.

### 8.1 Using `cargo odra build`

From the project root:

```bash
cargo odra build
```

This will:

- Build the WASM for each contract defined in `Odra.toml`
- Generate schema files describing entrypoints, arguments, and events

In the **example project**, these artifacts are later used by the backend and frontend (e.g., to know event names and types).

### 8.2 Optional `justfile`

You can add a `justfile` for convenience:

```just
default:
    just -l

build-contracts:
    cargo odra build

test:
    cargo odra test -b casper

lint:
    cargo fmt
```

Then run:

```bash
just build-contracts
```

---

## 9. Deployment Configuration

Odra uses environment variables to connect to a Casper node and sign deploys.

Example `.env`:

```bash
ODRA_CASPER_LIVENET_NODE_ADDRESS=http://127.0.0.1:11101
ODRA_CASPER_LIVENET_EVENTS_URL=http://127.0.0.1:18101
ODRA_CASPER_LIVENET_CHAIN_NAME=casper-net-1

ODRA_CASPER_LIVENET_SECRET_KEY_PATH=./user-1-keys/secret_key.pem
ODRA_CASPER_LIVENET_KEY_1=./user-2-keys/secret_key.pem
ODRA_CASPER_LIVENET_KEY_2=./user-3-keys/secret_key.pem
```

These values:

- Tell Odra which node to send deploys to
- Configure the chain name
- Provide signer keys

You can adapt them for:

- Devnet
- Testnet
- Mainnet

---

### Next Steps

**[→ Continue to Part 5: Building the backend with CSPR.cloud streaming](./05-building-the-backend-with-cspr-cloud-streaming.md)**

---

## Resources

- [Casper Network](https://casper.network) - Official website
- [Odra Framework](https://odra.dev/) - Smart contract development

## Community & Support
Join [Casper Developers](https://t.me/CSPRDevelopers) Telegram channel to connect with other developers.
