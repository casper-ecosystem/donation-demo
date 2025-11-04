import {
  CasperNetworkName,
  Deploy,
  makeCsprTransferDeploy,
  NativeTransferBuilder,
  PublicKey,
  TransactionV1
} from 'casper-js-sdk';

export function makeTransferDeploy(
  senderPublicKeyHex: string,
  recipientPublicKeyHex: string,
  amountMotes: string,
  chainName: string
) {
  const deploy = makeCsprTransferDeploy({
    senderPublicKeyHex: senderPublicKeyHex,
    recipientPublicKeyHex: recipientPublicKeyHex,
    transferAmount: amountMotes,
    chainName: chainName as CasperNetworkName,
    memo: '1234'
  });
  return Deploy.toJSON(deploy);
}

export function makeTransferTransaction(
  senderPublicKeyHex: string,
  recipientPublicKeyHex: string,
  amountMotes: string,
  chainName: string
) {
  const transaction = new NativeTransferBuilder()
    .from(PublicKey.fromHex(senderPublicKeyHex))
    .target(PublicKey.fromHex(recipientPublicKeyHex))
    .amount(amountMotes)
    .id(Date.now())
    .chainName(chainName)
    .payment(100_000_000)
    .build();
  return { transaction: { Version1: TransactionV1.toJSON(transaction.getTransactionV1()!) } };
}
