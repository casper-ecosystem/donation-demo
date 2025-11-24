# Building and Signing Transactions for Casper dApps

This guide shows you how to construct, sign, and submit transactions to Casper smart contracts using the Casper JS SDK and CSPR.click.

---

## Transaction Flow Overview

When interacting with Casper smart contracts, you need to:

1. **Construct the transaction** with proper arguments
2. **Sign and submit it** using CSPR.click (handles wallet interaction)
3. **Monitor transaction status** through callback handlers
4. **Handle success/error states** in your UI

Below is a complete example showing how to build a transaction that calls a contract's `donate` entrypoint through a proxy contract pattern, then sign and submit it via CSPR.click.

---

## Part 1: Building the Transaction
```typescript
import {
  Args,
  CLTypeUInt8,
  CLValue,
  Hash,
  PublicKey,
  SessionBuilder,
  TransactionWrapper
} from 'casper-js-sdk';
import { getProxyWasm } from '@/api';

export const buildTipTransaction = async (sender: string, amount: string, message: string) => {
  // 1. Load the proxy contract WASM
  const contractWasm = await getProxyWasm();

  // 2. Prepare inner arguments (for the target contract's entrypoint)
  const tipArgs = Args.fromMap({
    praise: CLValue.newCLString(message)
  });

  // 3. Serialize inner args as a byte array
  const serializedArgs = CLValue.newCLList(
    CLTypeUInt8,
    Array.from(tipArgs.toBytes()).map((value) => CLValue.newCLUint8(value))
  );

  // 4. Convert CSPR amount to motes (1 CSPR = 1,000,000,000 motes)
  const amountMotes = `${amount}000000000`;

  // 5. Build outer arguments (for the proxy contract)
  const args = Args.fromMap({
    amount: CLValue.newCLUInt512(amountMotes),
    attached_value: CLValue.newCLUInt512(amountMotes),
    entry_point: CLValue.newCLString('donate'),
    package_hash: CLValue.newCLByteArray(
      Hash.fromHex(config.donation_contract_package_hash).toBytes()
    ),
    args: serializedArgs
  });

  // 6. Build the session transaction
  const sessionTransaction = new SessionBuilder()
    .from(PublicKey.fromHex(sender))
    .runtimeArgs(args)
    .wasm(contractWasm)
    .payment(Number.parseInt(config.transaction_payment, 10))
    .chainName(window.csprclick?.chainName!)
    .build();

  // 7. Return in the format expected by CSPR.click
  return {
    transaction: {
      Version1: sessionTransaction.toJSON()
    }
  };
};
```

---

## Part 2: Signing and Sending with CSPR.click
```typescript
import { useClickRef } from '@make-software/csprclick-ui';
import { TransactionStatus } from '@make-software/csprclick-core-types';

const MyComponent = () => {
  const clickRef = useClickRef();
  const { activeAccount } = useClickContext();
  const [modalScreen, setModalScreen] = useState<'loading' | 'success' | 'error' | 'cancelled'>('loading');

  const handleSignTransaction = async (amount: string, message: string) => {
    // 1. Get the sender's public key from the active account
    const sender = activeAccount?.public_key?.toLowerCase() || '';

    // 2. Build the transaction
    const tipTransaction = await buildTipTransaction(sender, amount, message);

    // 3. Define status callback handler
    const onStatusUpdate = (status: string, data: any) => {
      if (status === TransactionStatus.CANCELLED) {
        setModalScreen('cancelled');
      }
      if (status === TransactionStatus.ERROR) {
        console.error('Error: ', data?.error + '(' + data?.errorData + ')');
        setModalScreen('error');
      }
      if (status === TransactionStatus.PROCESSED) {
        // Check if transaction was successful
        if (data.csprCloudTransaction?.error_message === null) {
          setModalScreen('success');
          // Refresh data after successful transaction
          setTimeout(() => onUpdateTipsList(), 4000);
        } else {
          console.error('Error: ', data?.error + '(' + data?.errorData + ')');
          setModalScreen('error');
        }
      }
    };

    // 4. Show loading state
    setModalScreen('loading');

    // 5. Send transaction (CSPR.click handles signing + submission)
    clickRef?.send(tipTransaction, sender, onStatusUpdate).catch((err: any) => {
      setModalScreen('error');
      alert('Error: ' + err);
    });
  };

  return (
    <div>
      <button onClick={() => handleSignTransaction('5', 'Great work!')}>
        Send Tip
      </button>
      {/* Modal showing current state */}
      <TransactionModal screen={modalScreen} />
    </div>
  );
};
```

---

## Understanding the Transaction Components

### 1. Loading Contract WASM
```typescript
const contractWasm = await getProxyWasm();
```

- The proxy WASM is fetched from your backend API
- This pattern allows you to call any contract dynamically
- The WASM is deployed as part of the session code

### 2. Preparing Arguments

**Inner arguments** (for the target contract):
```typescript
const tipArgs = Args.fromMap({
  praise: CLValue.newCLString(message)
});
```

**Serializing inner arguments**:
```typescript
const serializedArgs = CLValue.newCLList(
  CLTypeUInt8,
  Array.from(tipArgs.toBytes()).map((value) => CLValue.newCLUint8(value))
);
```

This converts the arguments into a byte array that can be passed through the proxy.

**Outer arguments** (for the proxy contract):
```typescript
const args = Args.fromMap({
  amount: CLValue.newCLUInt512(amountMotes),
  attached_value: CLValue.newCLUInt512(amountMotes),
  entry_point: CLValue.newCLString('donate'),
  package_hash: CLValue.newCLByteArray(
    Hash.fromHex(config.donation_contract_package_hash).toBytes()
  ),
  args: serializedArgs
});
```

### 3. Amount Conversion
```typescript
const amountMotes = `${amount}000000000`;
```

- Casper uses **motes** as the smallest unit
- 1 CSPR = 1,000,000,000 motes (9 decimal places)
- Always convert user-facing CSPR amounts to motes before sending

### 4. Building the Session Transaction
```typescript
const sessionTransaction = new SessionBuilder()
  .from(PublicKey.fromHex(sender))           // Who's sending
  .runtimeArgs(args)                         // Contract arguments
  .wasm(contractWasm)                        // Session code (proxy)
  .payment(Number.parseInt(config.transaction_payment, 10))  // Gas fee
  .chainName(window.csprclick?.chainName!)   // Network (casper/casper-test)
  .build();
```

**Key parameters:**
- `from()` - The sender's public key (from connected wallet)
- `runtimeArgs()` - Arguments passed to the contract
- `wasm()` - The session WASM to deploy
- `payment()` - Gas payment amount in motes
- `chainName()` - Network identifier from CSPR.click

### 5. Return Format
```typescript
return {
  transaction: {
    Version1: sessionTransaction.toJSON()
  }
};
```

CSPR.click expects transactions in this specific format with the `Version1` wrapper.

---

## Common Transaction Patterns

### Direct Contract Call (No Proxy)

If you're calling a contract directly by hash (not using a proxy):
```typescript
import { ContractCallBuilder } from 'casper-js-sdk';

const buildDirectContractCall = async (sender: string, recipientKey: string, amount: string) => {
  const args = Args.fromMap({
    recipient: CLValue.newCLPublicKey(PublicKey.fromHex(recipientKey)),
    amount: CLValue.newCLUInt512(amount + '000000000')
  });

  const transaction = new ContractCallBuilder()
    .from(PublicKey.fromHex(sender))
    .contractHash(Hash.fromHex(config.contract_hash))
    .entryPoint('transfer')
    .runtimeArgs(args)
    .payment(3000000000)  // 3 CSPR gas
    .chainName(window.csprclick?.chainName!)
    .build();

  return {
    transaction: {
      Version1: transaction.toJSON()
    }
  };
};
```

### Native CSPR Transfer

For simple CSPR transfers (no contract):
```typescript
import { TransferBuilder } from 'casper-js-sdk';

const buildNativeTransfer = async (sender: string, recipient: string, amount: string) => {
  const transaction = new TransferBuilder()
    .from(PublicKey.fromHex(sender))
    .to(PublicKey.fromHex(recipient))
    .amount(amount + '000000000')  // Convert to motes
    .payment(100000000)    // 0.1 CSPR gas
    .chainName(window.csprclick?.chainName!)
    .build();

  return {
    transaction: {
      Version1: transaction.toJSON()
    }
  };
};
```

---

## Debugging Transactions
### Inspect Status Callback Data

In `onStatusUpdate`, log all fields:

```typescript
const onStatusUpdate = (status: string, data: any) => {
    console.group('Transaction Status Update');
    console.log('Status:', status);
    console.log('Data:', data);

    if (data.deployHash) {
        console.log('Deploy Hash:', data.deployHash);
    }

    if (data.csprCloudTransaction) {
        console.log('csprCloudTransaction:', data.csprCloudTransaction);
    }

    console.groupEnd();
};
```

---

## Error Handling Reference

### Common Errors and Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| "Wallet not connected" | No active account | Check `activeAccount` before building transaction |
| "Invalid public key" | Malformed hex string | Validate with `/^[0-9a-fA-F]{66}$/` |
| "Insufficient balance" | Not enough CSPR for amount + gas | Check balance before transaction |
| "Transaction timeout" | Network congestion | Increase gas payment or retry |
| "Invalid contract hash" | Wrong contract address | Verify contract hash in config |
| "User cancelled" | User declined in wallet | Handle gracefully, don't show error |

### Comprehensive Error Handler
```typescript
const handleTransactionError = (error: any, status?: string) => {
  console.error('Transaction error:', error);

  if (status === TransactionStatus.CANCELLED) {
    // User cancelled - not really an error
    setModalScreen('cancelled');
    return;
  }

  // Parse error message
  const errorMsg = error?.message || error?.error || 'Unknown error';

  if (errorMsg.includes('insufficient')) {
    alert('Insufficient balance. Please add CSPR to your wallet.');
  } else if (errorMsg.includes('network') || errorMsg.includes('timeout')) {
    alert('Network error. Please check your connection and try again.');
  } else if (errorMsg.includes('invalid')) {
    alert('Invalid transaction. Please check your inputs.');
  } else if (errorMsg.includes('rejected') || errorMsg.includes('denied')) {
    alert('Transaction was rejected. Please try again.');
  } else {
    alert(`Transaction failed: ${errorMsg}`);
  }

  setModalScreen('error');
};
```

---

## Summary

Building and signing transactions for Casper with CSPR.click involves:

1. **Building the transaction** using Casper JS SDK builders
2. **Getting the active account** from CSPR.click context
3. **Calling `clickRef.send()`** which handles signing and submission automatically
4. **Implementing status callbacks** to track transaction progress
5. **Handling all possible states**: pending, signing, submitted, processed, cancelled, error
6. **Providing clear UI feedback** at each stage

### Key Advantages of CSPR.click

- **Unified wallet UX** - Works with Casper Wallet, Ledger, MetaMask
- **Automatic signing** - No manual signature management
- **Built-in monitoring** - Status updates handled for you
- **Error handling** - Clear error messages from the platform
- **Deploy tracking** - Automatic monitoring until finalization

---

## Resources

- **CSPR.click Documentation**: [https://docs.cspr.click](https://docs.cspr.click)
- **CSPR.click SDK Reference**: [https://docs.cspr.click/cspr.click-sdk/reference](https://docs.cspr.click/cspr.click-sdk/reference)
- **Casper JS SDK**: [https://github.com/casper-ecosystem/casper-js-sdk](https://github.com/casper-ecosystem/casper-js-sdk)
- **Transaction Status Types**: [https://docs.cspr.click/cspr.click-sdk/reference/types#transactionstatus](https://docs.cspr.click/cspr.click-sdk/reference/types#transactionstatus)

## Community & Support

Join [Casper Developers](https://t.me/CSPRDevelopers) Telegram channel for help with transactions and CSPR.click integration.
