//! This example demonstrates how to use the `odra-cli` tool to deploy and interact with a smart contract.
use tips_demo::tips::TipTheBarista;
use odra::host::{HostEnv, HostRef, NoArgs};
use odra::schema::casper_contract_schema::NamedCLType;
use odra_cli::{
    deploy::DeployScript,
    scenario::{Args, Error, Scenario, ScenarioMetadata},
    CommandArg, ContractProvider, DeployedContractsContainer, DeployerExt,
    OdraCli, 
};

/// Deploys the `TipTheBarista` contract and adds it to the container.
pub struct TipTheBaristaDeployScript;

impl DeployScript for TipTheBaristaDeployScript {
    fn deploy(
        &self,
        env: &HostEnv,
        container: &mut DeployedContractsContainer
    ) -> Result<(), odra_cli::deploy::Error> {
        TipTheBarista::load_or_deploy(
            &env,
            NoArgs,
            container,
            350_000_000_000 // Adjust gas limit as needed
        )?;

        Ok(())
    }
}

/// Scenario that sends a tip to the contract owner.
pub struct TipTheBaristaScenario;

impl Scenario for TipTheBaristaScenario {
    fn args(&self) -> Vec<CommandArg> {
        vec![
            CommandArg::new(
            "amount",
            "The amount of CSPR to send to the barista.",
            NamedCLType::U512,
        ),
            CommandArg::new(
                "praise",
                "A short message of appreciation to include with your tip for the barista.",
                NamedCLType::String,
            ),
        ]
    }

    fn run(
        &self,
        env: &HostEnv,
        container: &DeployedContractsContainer,
        args: Args
    ) -> Result<(), Error> {
        let contract = container.contract_ref::<TipTheBarista>(env)?;
        let amount = args.get_single::<odra::casper_types::U512>("amount")?;
        let praise = args.get_single::<String>("praise")?;

        env.set_caller(env.get_account(1));
        env.set_gas(9_000_000_000);
        contract.with_tokens(amount).donate(praise);

        Ok(())
    }
}

impl ScenarioMetadata for TipTheBaristaScenario {
    const NAME: &'static str = "tip";
    const DESCRIPTION: &'static str =
        "Sends a tip to the barista.";
}

/// Main function to run the CLI tool.
pub fn main() {
    OdraCli::new()
        .about("CLI tool for BuyMeACoffee smart contract")
        .deploy(TipTheBaristaDeployScript)
        .contract::<TipTheBarista>()
        .scenario(TipTheBaristaScenario)
        .build()
        .run();
}
