import {
  Args,
  CLTypeUInt8,
  CLValue,
  Hash,
  PublicKey,
  SessionBuilder,
  TransactionV1
} from 'casper-js-sdk';
import { getProxyWasm } from '@/api';

export const buildTipTransaction = async (
  sender: string,
  amount: string,
  message: string
): Promise<{ transaction: { Version1: unknown } }> => {
  const contractWasm = await getProxyWasm();

  const tipArgs = Args.fromMap({
    praise: CLValue.newCLString(message)
  });

  const serializedArgs = CLValue.newCLList(
    CLTypeUInt8,
    Array.from(tipArgs.toBytes()).map((value) => CLValue.newCLUint8(value))
  );

  const amountMotes = `${amount}000000000`;

  const args = Args.fromMap({
    amount: CLValue.newCLUInt512(amountMotes),
    attached_value: CLValue.newCLUInt512(amountMotes),
    entry_point: CLValue.newCLString('donate'),
    package_hash: CLValue.newCLByteArray(
      Hash.fromHex(config.donation_contract_package_hash).toBytes()
    ),
    args: serializedArgs
  });

  const sessionTransaction = new SessionBuilder()
    .from(PublicKey.fromHex(sender))
    .runtimeArgs(args)
    .wasm(contractWasm)
    .payment(Number.parseInt(config.transaction_payment, 10)) // in motes
    .chainName(window.csprclick?.chainName!)
    .build();

  const txV1 = sessionTransaction.getTransactionV1();
  if (!txV1) {
    throw new Error('Failed to build TransactionV1');
  }

  return {
    transaction: {
      Version1: TransactionV1.toJSON(txV1)
    }
  };
};
