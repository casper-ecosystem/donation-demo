import {
  BodyText,
  TableData,
  TableRow,
  formatHash,
  HashLength,
  formatTimestamp
} from '@make-software/cspr-design';
import PrizeCell from 'components/common/prize-cell/prize-cell';
import styled from 'styled-components';
import { HistoryLink } from 'components/common/history-link/history-link';
import { Tip } from 'api/tips-requests';
import AccountInfoCell from 'components/common/account-info-cell/account-info-cell';

interface TipsTableRowProps {
  tip: Tip;
}

const StyledMessageText = styled.div(({ theme }) =>
  theme.withMedia({
    width: '300px',
    maxWidth: '300px'
  })
);

const StyledContentBlock = styled(TableData)<{ width?: number; minWidth?: number }>(
  ({ theme, width, minWidth }) =>
    theme.withMedia({
      width: [width + '%'],
      maxWidth: [width + '%'],
      minWidth: [minWidth + 'px', minWidth + 'px', 'unset'],
      // paddingLeft: '0',
      td: {
        ':first-of-type': {
          paddingLeft: '0',
          paddingRight: '10px'
        }
      }
    })
);

const StyledTimeText = styled(BodyText)(({ theme }) =>
  theme.withMedia({
    color: theme.styleguideColors.contentPrimary
  })
);

const TipsTableRow = ({ tip }: TipsTableRowProps) => {
  const accountPath = `${config.cspr_live_url}/transaction/${tip.transaction_hash}`;
  return (
    <TableRow key={tip.id}>
      <StyledContentBlock width={19} minWidth={100}>
        <AccountInfoCell accountHash={tip.transaction_hash} publicKey={tip.sender_public_key} />
      </StyledContentBlock>
      <StyledContentBlock width={14} minWidth={132}>
        <PrizeCell amount={tip.amount_cspr} />
      </StyledContentBlock>
      <StyledContentBlock width={27}>
        <StyledMessageText>{tip.message}</StyledMessageText>
      </StyledContentBlock>
      <StyledContentBlock width={16}>
        <HistoryLink href={accountPath} target={'_blank'} monotype>
          {formatHash(tip.transaction_hash, HashLength.TINY)}
        </HistoryLink>
      </StyledContentBlock>
      <StyledContentBlock width={100} minWidth={300}>
        <StyledTimeText size={3} monotype>
          {formatTimestamp(tip.timestamp)}
        </StyledTimeText>
      </StyledContentBlock>
    </TableRow>
  );
};

export default TipsTableRow;
