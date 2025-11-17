import {
  Args,
  CLTypeUInt8,
  CLValue,
  Hash,
  PublicKey,
  SessionBuilder,
  TransactionV1
} from 'casper-js-sdk';

const API_URL = config.donation_api_url;

const getProxyWASM = async (): Promise<Uint8Array> => {
  const result = await fetch(`${API_URL}/proxy-wasm`);
  if (!result.ok) {
    throw new Error(await result.text());
  }
  const buffer = await result.arrayBuffer();
  return new Uint8Array(buffer);
};

export const buildTipTransaction = async (sender: string, amount: string, message: string) => {
  const contractWasm = await getProxyWASM();

  const tipArgs = Args.fromMap({
    praise: CLValue.newCLString(message)
  });
  const serialized_args = CLValue.newCLList(
    CLTypeUInt8,
    Array.from(tipArgs.toBytes()).map((value) => CLValue.newCLUint8(value))
  );

  const args = Args.fromMap({
    amount: CLValue.newCLUInt512(amount + '000000000'),
    attached_value: CLValue.newCLUInt512(amount + '000000000'),
    entry_point: CLValue.newCLString('donate'),
    package_hash: CLValue.newCLByteArray(
      Hash.fromHex(config.donation_contract_package_hash).toBytes()
    ),
    args: serialized_args
  });
  const sessionTransaction = new SessionBuilder()
    .from(PublicKey.fromHex(sender))
    .runtimeArgs(args)
    .wasm(new Uint8Array(contractWasm))
    .payment(Number.parseInt(config.transaction_payment, 10)) // in motes
    .chainName(window.csprclick.chainName!)
    .build();

  return {
    transaction: { Version1: TransactionV1.toJSON(sessionTransaction.getTransactionV1()!) }
  } as object;
};
