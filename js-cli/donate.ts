import {
  Args,
  HttpHandler,
  RpcClient,
  CLValue,
  SessionBuilder,
  CLTypeUInt8,
  Hash,
} from "casper-js-sdk";
import * as fs from "fs/promises";
import { getSenderKey } from "./utils";

const { program } = require("commander");

program
  .option(
    "--node_url [value]",
    "node URL in format {http://localhost:11101/rpc}",
    "http://localhost:11101/rpc"
  )
  .option("--network_name [value]", "network_name", "casper-net-1")
  .requiredOption("--owner_keys_path [value]", "path to contract owners keys")
  .option("--keys_algo [value]", "Crypto algo ed25519 | secp256K1", "ed25519")
  .option(
    "--proxy_caller [value]",
    "proxy caller wasm file",
    "./proxy_caller.wasm"
  )
  .requiredOption(
    "--contract_package_hash [value]",
    "staking contract package address"
  )
  .option("--payment_amount [value]", "motes to cover gas costs", "12000000000")
  .requiredOption("--amount [value]", "amount to unstake")
  .requiredOption("--praise [value]", "amount to unstake");

program.parse();

const options = program.opts();

const sendTip = async () => {
  const owner = await getSenderKey(options.owner_keys_path, options.keys_algo);
  const contractWasm = await fs.readFile(options.proxy_caller);

  const tipArgs = Args.fromMap({
    praise: CLValue.newCLString(options.praise),
  });
  const serialized_args = CLValue.newCLList(
    CLTypeUInt8,
    Array.from(tipArgs.toBytes()).map((value) => CLValue.newCLUint8(value))
  );

  const args = Args.fromMap({
    amount: CLValue.newCLUInt512(options.amount),
    attached_value: CLValue.newCLUInt512(options.amount),
    entry_point: CLValue.newCLString("tip_the_barista"),
    package_hash: CLValue.newCLByteArray(
      Hash.fromHex(options.contract_package_hash).toBytes()
    ),
    args: serialized_args,
  });

  const sessionTransaction = new SessionBuilder()
    .from(owner.publicKey)
    .runtimeArgs(args)
    .wasm(new Uint8Array(contractWasm))
    .payment(Number.parseInt(options.payment_amount, 10)) // Amount in motes
    .chainName(options.network_name)
    .build();

  sessionTransaction.sign(owner);

  const rpcHandler = new HttpHandler(options.node_url);
  const rpcClient = new RpcClient(rpcHandler);
  const result = await rpcClient.putTransaction(sessionTransaction);
  console.log("Transaction hash: ", result.transactionHash.toHex());
};

sendTip();
