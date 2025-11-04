import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Section } from './Section';
import { AccountIdenticon, useClickRef } from '@make-software/csprclick-ui';
import { SendResult } from '@make-software/csprclick-core-client';
import { TransactionStatus } from '@make-software/csprclick-core-types';
import { makeTransferTransaction } from './transfer-deploy';
import Prism from 'prismjs';

export const StyledTD = styled.td(({ theme }) =>
  theme.withMedia({
    fontWeight: '600',
    margin: '4px 15px 4px 0',
    display: 'block'
  })
);

export const SpanTruncated = styled.span(({ theme }) =>
  theme.withMedia({
    display: 'inline-block',
    fontFamily: 'JetBrains Mono',
    width: ['150px', '350px', '100%'],
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  })
);
const AccountRow = styled.div(({ theme }) =>
  theme.withMedia({
    display: 'flex',
    flexDirection: 'row',
    gap: '8px',
    alignItems: 'center'
  })
);

const StyledTitle = styled.div(({ theme }) =>
  theme.withMedia({
    color: theme.styleguideColors.fillSecondary
  })
);

export const BuyMeACoffee = () => {
  const [transactionHash, setTransactionHash] = useState<string | undefined>(undefined);
  const [waitingResponse, setWaitingResponse] = useState<boolean>(false);
  const recipientPk = '0203596b49460de7900614b5e25a1fa1861b3eb944c42bea18fc7506b220fd4d9d61';

  const clickRef = useClickRef();
  const activeAccount = clickRef?.getActiveAccount();

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const handleSignTransaction = (evt: any) => {
    evt.preventDefault();
    const sender = activeAccount?.public_key?.toLowerCase() || '';
    const transaction = makeTransferTransaction(
      sender,
      recipientPk,
      '50' + '000000000',
      clickRef.chainName!
    );
    console.log('TRANSACTION', transaction);
    signAndSend(transaction as object, sender);
  };

  const signAndSend = (tbs: object, sender: string) => {
    const onStatusUpdate = (status: string, data: any) => {
      console.log('STATUS UPDATE', status, data);
      if (status === TransactionStatus.SENT) setWaitingResponse(true);
    };

    clickRef
      ?.send(tbs, sender, onStatusUpdate)
      .then((res: SendResult | undefined) => {
        setWaitingResponse(false);
        if (res?.transactionHash) {
          setTransactionHash(res.transactionHash);
          alert(
            'Transaction sent successfully: ' +
              res.transactionHash +
              '\n Status: ' +
              res.status +
              '\n Timestamp: ' +
              res.csprCloudTransaction.timestamp
          );
        } else if (res?.cancelled) {
          alert('Sign cancelled');
        } else {
          alert('Error in send(): ' + res?.error + '\n' + res?.errorData);
        }
      })
      .catch((err: any) => {
        alert('Error: ' + err);
        throw err;
      });
  };

  return (
    <>
      <Section>
        <span>
          Your application will often need to send transactions to the Casper Network. Let&apos;s
          illustrate this with a simple example: buying Alice a coffee using testnet CSPR tokens.
        </span>

        <ol>
          <li>
            <b>Build the transaction</b>
            <p>
              First, construct a transfer transaction. The
              <em>casper-js-sdk</em> is included in this template to help you with this step. Refer
              to the official{' '}
              <a href={'https://casper-ecosystem.github.io/casper-js-sdk/'}>
                Casper SDK documentation
              </a>{' '}
              for more detailed usage and examples.
            </p>
          </li>

          <li>
            <b>Send the transaction</b>
            <p>
              Next, call the <code>clickRef.send()</code> method. CSPR.click will:
            </p>
            <ul>
              <li>Prompt the user in the active wallet to review and sign the transaction.</li>
              <li>Forward the signed transaction to a Casper node for processing.</li>
            </ul>
          </li>

          <li>
            <b>Handle responses</b>
            <p>Your application should be prepared to handle all possible outcomes:</p>
            <ul>
              <li>
                <strong>Success:</strong> The transaction was sent and you receive a transaction
                hash.
              </li>
              <li>
                <strong>User rejection:</strong> The user declined to sign the transaction.
              </li>
              <li>
                <strong>Network rejection:</strong> The Casper node rejected the transaction.
              </li>
            </ul>
            <p>
              You can handle responses using the <code>.then()</code> and <code>.catch()</code>{' '}
              blocks, or use the status updates as explained in the next step.
            </p>
          </li>

          <li>
            <b>(Optional) Track transaction status</b>
            <p>
              The <code>.send()</code> method accepts an optional callback function as its second
              argument. This callback receives <strong>transaction status updates</strong> while the
              transaction is being executed, enabling you to:
            </p>
            <ul>
              <li>Show progress indicators in your UI (e.g., “Transaction pending…”)</li>
              <li>Update users when the transaction is confirmed or fails</li>
              <li>Provide richer feedback beyond just the final outcome</li>
            </ul>
          </li>
        </ol>
      </Section>
      <Section>
        <pre>
          <code className={'language-javascript'}>
            {`const sender = activeAccount?.public_key?.toLowerCase() || '';
            
const transaction = makeTransferTransaction(
    sender,
    recipientPk,
    '50' + '000000000',
    clickRef.chainName
);

const onStatusUpdate = (status: string, data: any) => {
  console.log('STATUS UPDATE', status, data);
  if(status === TransactionStatus.SENT)
    setWaitingResponse(true);
};

clickRef.send(transaction, sender, onStatusUpdate)
    .then((res: SendResult | undefined) => {
        if (res?.transactionHash) {
        setTransactionHash(res.transactionHash);
        alert('Transaction sent successfully: ' + res.transactionHash);
      } else if (res?.cancelled) {
        alert('Sign cancelled');
      } else {
        alert('Error in send(): ' + res?.error + ' ' + res?.errorData);
      }
    })
    .catch((err: any) => {
      alert('Error: ' + err);
      throw err;
    });
`}
          </code>
        </pre>
      </Section>
      <Section withBackground>
        <table>
          <tbody>
            <tr>
              <StyledTD>Send:</StyledTD>
              <td>50 CSPR</td>
            </tr>
            <tr>
              <StyledTD>From:</StyledTD>
              <td>
                <i>your account</i>
              </td>
            </tr>
            <tr>
              <StyledTD>To:</StyledTD>
              <td>
                <AccountRow>
                  <AccountIdenticon hex={recipientPk} size="sm"></AccountIdenticon>
                  <SpanTruncated>{recipientPk}</SpanTruncated>
                </AccountRow>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                {activeAccount?.public_key && (
                  <>
                    <button onClick={(evt) => handleSignTransaction(evt)}>
                      <StyledTitle>Sign transaction</StyledTitle>
                    </button>
                  </>
                )}
              </td>
            </tr>
          </tbody>
        </table>

        {transactionHash && (
          <a
            href={`${clickRef?.appSettings?.csprlive_url}deploy/${transactionHash}`}
            target="_blank"
            rel="noreferrer"
          >
            Check transfer status on CSPR.live
          </a>
        )}
        {waitingResponse && (
          <span className="listening-notice">Listening for transaction processing messages...</span>
        )}
      </Section>
    </>
  );
};
