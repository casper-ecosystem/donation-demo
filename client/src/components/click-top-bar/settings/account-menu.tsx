import { AccountCardMenuItem, AccountMenuItem } from '@make-software/csprclick-ui';
import CSPRClickIcon from 'assets/logos/click-logo.svg';

export const accountMenuItems = [
  <AccountCardMenuItem key={0} />,
  <AccountMenuItem
    key={1}
    onClick={() => {
      window.open('https://docs.cspr.click', '_blank');
    }}
    icon={CSPRClickIcon}
    label={'CSPR.click docs'}
    badge={{ title: 'new', variation: 'green' }}
  />
];
