import { useEffect } from 'react';
import styled from 'styled-components';
import { Section } from './Section';
import Prism from 'prismjs';

const AccountMenuExample = styled.img(({ theme }) =>
  theme.withMedia({
    width: ['70%', '75%', '50%']
  })
);

export const CustomMenuItems = () => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <>
      <Section>
        <span>
          You can customize the account dropdown menu in our top bar with your own menu items.
          Options to switch to another account and sign out are always present at the end of the
          list. The rest, depends on your needs. We provide a couple of common menu item components
          you may add, and one component for you to include anything you need.
        </span>
        <span>The following piece of code shows you how to customize the account menu:</span>
      </Section>
      <Section>
        <pre>
          <code className={'language-javascript'}>
            {`export const accountMenuItems = [
	<AccountCardMenuItem key={0} />,
	<CopyHashMenuItem key={1} />,
	<AccountMenuItem
		key={2}
		onClick={() => {
			window.location.href = 'https://docs.cspr.click';
		}}
		icon={CSPRClickIcon}
		label={'CSPR.click docs'}
		badge={{ title: 'new', variation: 'green' }}
	/>,
];
`}
          </code>
        </pre>
      </Section>
      <Section>
        <span>
          Now, add the items to the <code>&lt;ClickUI&gt;</code> component:
        </span>
      </Section>
      <Section>
        <pre>
          <code className={'language-markup'}>
            {`<ClickUI topBarSettings={{accountMenuItems}}/>
`}
          </code>
        </pre>
      </Section>
      <Section>
        <div style={{ marginBottom: '10px' }}>
          <span>You will see update Account Menu:</span>
        </div>
      </Section>
    </>
  );
};
