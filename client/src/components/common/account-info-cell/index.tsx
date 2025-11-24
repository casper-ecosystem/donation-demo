import React from 'react';
import { AccountIdenticon } from '@make-software/csprclick-ui';
import { BodyText, FlexRow, formatHash, HashLength, Link } from '@make-software/cspr-design';
import { Tooltip } from '@/components';
import { StyledAccountInfoText } from '@/components/common/account-info-cell/styled';

interface AccountInfoCellProps {
  accountHash?: string;
  publicKey: string;
}

export const AccountInfoCell: React.FC<AccountInfoCellProps> = ({ publicKey, accountHash }) => {
  const hash = publicKey || accountHash || '';
  const accountPath = `${config.cspr_live_url}/account/${hash}`;

  return (
    <FlexRow align="center" itemsSpacing={12}>
      <AccountIdenticon hex={hash} size="m" />
      <Tooltip tooltipContent={publicKey} caption={'Public key'}>
        <BodyText size={3} scale={'sm'}>
          <Link href={accountPath} target={'_blank'} color={'hash'}>
            <StyledAccountInfoText size={2} monotype>
              {formatHash(hash, HashLength.TINY)}
            </StyledAccountInfoText>
          </Link>
        </BodyText>
      </Tooltip>
    </FlexRow>
  );
};
