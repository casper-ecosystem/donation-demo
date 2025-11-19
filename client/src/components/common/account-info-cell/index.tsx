import React from 'react';
import { AccountIdenticon } from '@make-software/csprclick-ui';
import { BodyText, FlexRow, formatHash, HashLength, Link } from '@make-software/cspr-design';

interface AccountInfoCellProps {
  accountHash?: string;
  publicKey: string;
}

export const AccountInfoCell: React.FC<AccountInfoCellProps> = ({ publicKey, accountHash }) => {
  const hash = publicKey || accountHash || '';
  const accountPath = `${config.cspr_live_url}/account/${hash}`;
  return (
    <FlexRow align="center" itemsSpacing={12} style={{ padding: '12px 8px' }}>
      <AccountIdenticon hex={hash} size="m" />
      <BodyText variation="darkGray" size={3} scale={'sm'}>
        <Link href={accountPath} target={'_blank'} color={'hash'}>
          <BodyText size={1} variation={'darkGray'} monotype>
            {formatHash(hash, HashLength.TINY)}
          </BodyText>
        </Link>
      </BodyText>
    </FlexRow>
  );
};
