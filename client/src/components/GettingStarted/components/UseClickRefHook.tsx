import { useEffect } from 'react';
import { Section } from './Section';
import Prism from 'prismjs';

export const UseClickRefHook = () => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <>
      <Section>
        <span>
          This is the bridge between your app and CSPR.click SDK. Use <code>useClickRef()</code> to
          get a reference to the CSPR.click SDK instance. This is the only way to communicate with
          CSPR.click API. By calling CSPR.click API, through <code>useClickRef()</code>, you&apos;ll
          have an access to all necessary data and possibility to request any available operation.
        </span>
      </Section>
      <Section>
        <pre>
          <code className={'language-javascript'}>
            {`import { useClickRef } from '@make-software/csprclick-ui';

function MyComponent() {
  const clickRef = useClickRef();
  ...
}`}
          </code>
        </pre>
      </Section>
    </>
  );
};
