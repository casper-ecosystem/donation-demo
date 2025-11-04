import { useEffect } from 'react';
import { Section } from './Section';
import { useClickRef } from '@make-software/csprclick-ui';
import Prism from 'prismjs';
import { SpanTruncated, StyledTD } from './BuyMeACoffee';

const UserAccount = () => {
  const clickRef = useClickRef();
  const activeAccount = clickRef?.getActiveAccount();
  return (
    <table>
      <tbody>
        <tr>
          <StyledTD>Public key:</StyledTD>
          <td>
            <SpanTruncated>{activeAccount?.public_key}</SpanTruncated>
          </td>
        </tr>
        <tr>
          <StyledTD>Provider:</StyledTD>
          <td>{activeAccount?.provider}</td>
        </tr>
      </tbody>
    </table>
  );
};

export const Account = () => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <>
      <Section>
        <span>
          Use <code>useClickRef()</code> hook to get a reference to the CSPR.click SDK instance.
          With this instance you easily can get an access to user&apos;s active account with all
          information: such as public key, provider, etc. You can use it to display relevant users
          data as in example below:
        </span>
      </Section>
      <Section>
        <pre>
          <code className={'language-javascript'}>
            {`const UserAccount = () => {
  const clickRef = useClickRef()
  const activeAccount = clickRef?.getActiveAccount()
    return (
      <table>
        <tr><td>Public key:</td><td>{activeAccount.public_key}</td></tr>
        <tr><td>Provider:</td><td>{activeAccount.provider}</td></tr>
      </table>  
    )`}
          </code>
        </pre>
      </Section>
      <Section withBackground>
        <UserAccount />
      </Section>
    </>
  );
};
