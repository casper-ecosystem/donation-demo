import styled from 'styled-components';
import { AccountIdenticon } from '@make-software/csprclick-ui';
import { HashLength } from '../../utils/formatters';
import { BodyText, FlexRow, TableData, formatHash } from '@make-software/cspr-design';
import { HistoryLink } from '../common/history-link/history-link';

export const StyledTableData = styled(TableData)(() => ({
  padding: '12px 8px'
}));

interface AccountInfoCellProps {
  accountHash?: string;
  publicKey: string;
}

export const AccountInfoCell = ({ publicKey, accountHash }: AccountInfoCellProps) => {
  const hash = publicKey || accountHash || '';
  const CSPR_LIVE_URL = process.env.REACT_APP_CSPR_LIVE_URL;
  const accountPath = `${CSPR_LIVE_URL}/account/${publicKey}`;
  return (
    <StyledTableData>
      <FlexRow align="center" itemsSpacing={12}>
        <AccountIdenticon hex={hash} size="m" />
        <BodyText variation="darkGray" size={3} scale={'sm'}>
          <HistoryLink href={accountPath} target={'_blank'} monotype>
            {formatHash(hash, HashLength.TINY)}
          </HistoryLink>
        </BodyText>
      </FlexRow>
    </StyledTableData>
  );
};

export default AccountInfoCell;
