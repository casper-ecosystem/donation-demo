use odra::casper_types::{U512};
use odra::named_keys::single_value_storage;
use odra::prelude::*;

/// Contract's human-readable name.
const CONTRACT_NAME: &str = "contract_name";
/// Brief description of the contract.
const CONTRACT_DESCRIPTION: &str = "contract_description";
/// URI pointing to the contract's icon image.
const CONTRACT_ICON_URI: &str = "contract_icon_uri";
/// URI pointing to the project's website or documentation.
const CONTRACT_PROJECT_URI: &str = "contract_project_uri";

single_value_storage!(
    ContractNameStorage,
    String,
    CONTRACT_NAME,
    ExecutionError::KeyNotFound
);

single_value_storage!(
    ContractDescriptionStorage,
    String,
    CONTRACT_DESCRIPTION,
    ExecutionError::KeyNotFound
);

single_value_storage!(
    ContractIconUriStorage,
    String,
    CONTRACT_ICON_URI,
    ExecutionError::KeyNotFound
);

single_value_storage!(
    ContractProjectUriStorage,
    String,
    CONTRACT_PROJECT_URI,
    ExecutionError::KeyNotFound
);

#[odra::event]
pub struct Tip {
    pub sender: Address,
    pub amount: U512,
    pub praise: String,
}

#[odra::odra_error]
pub enum ContractErrors {
    BelowMinimumAmount = 2001,
}

const MINIMUM_AMOUNT: u64 = 10_000_000_000u64;

#[odra::module(
    errors = ContractErrors,
    events = [Tip]
)]
pub struct TipTheBarista {
    /// The recipient of the coffee.
    recipient: Var<Address>,
    contract_name: SubModule<ContractNameStorage>,
    contract_description: SubModule<ContractDescriptionStorage>,
    contract_icon_uri: SubModule<ContractIconUriStorage>,
    contract_project_uri: SubModule<ContractProjectUriStorage>,
}

#[odra::module]
impl TipTheBarista {
    /// TipTheBarista constructor. Initializes the contract.
    pub fn init(&mut self) {
        let caller = self.env().caller();
        self.recipient.set(caller);
        self.contract_name.set("Tip The Barista".to_string());
        self.contract_description.set("A beginner-friendly smart contract designed to show how easy it is to build and deploy a basic dApp on the Casper Network.".to_string());
        self.contract_icon_uri.set("https://donation-demo.casper.network/contract-icon.jpg".to_string());
        self.contract_project_uri.set("https://donation-demo.casper.network".to_string());
    }

    /// Send a tip to the contract owner.
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

#[cfg(test)]
mod tests {
    use odra::casper_event_standard::EventInstance;
    use super::*;
    use odra::host::{Deployer, HostRef, NoArgs};

    #[test]
    fn it_works() {
        let env = odra_test::env();

        let alice = env.get_account(1);
        let admin = env.get_account(0);
        env.set_caller(admin);
        let contract = TipTheBarista::deploy(&env, NoArgs);

        let admin_balance_before = env.balance_of(&admin.clone());
        
        // When Alice sends a 10 CSPR tip
        let buy_amount_u512 = U512::from(10_000_000_000u64);
        env.set_caller(alice);
        let praise = "Your work is inspiring. Cheers from another dev!".to_string();
        let result = contract.with_tokens(buy_amount_u512).try_donate(praise.clone());

        // Then it should succeed...
        assert!(result.is_ok());

        // ...and the admin should receive the funds
        let admin_balance_after = env.balance_of(&admin.clone());

        assert_eq!(
            admin_balance_after,
            admin_balance_before + buy_amount_u512
        );

        // ...and emit an event.
        assert!(env.emitted(&contract, Tip::name()));
    }
}