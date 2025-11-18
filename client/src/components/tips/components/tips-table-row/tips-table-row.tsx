import { BodyText, TableData, TableRow, formatHash } from '@make-software/cspr-design';
import PrizeCell from 'components/common/prize-cell/prize-cell';
import { formatTimestamp, HashLength } from 'utils/formatters';
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

const StyledTimeText = styled(BodyText)(({ theme }) =>
  theme.withMedia({
    color: theme.styleguideColors.contentPrimary
  })
);

const TipsTableRow = ({ tip }: TipsTableRowProps) => {
  const accountPath = `${config.cspr_live_url}/transaction/${tip.transaction_hash}`;
  return (
    <TableRow key={tip.id}>
      <TableData>
        <AccountInfoCell accountHash={tip.transaction_hash} publicKey={tip.sender_public_key} />
      </TableData>

      <TableData>
        <PrizeCell amount={tip.amount_cspr} />
      </TableData>
      <TableData>
        <StyledMessageText>{tip.message}</StyledMessageText>
      </TableData>
      <TableData>
        <HistoryLink href={accountPath} target={'_blank'} monotype>
          {formatHash(tip.transaction_hash, HashLength.TINY)}
        </HistoryLink>
      </TableData>
      <TableData>
        <StyledTimeText size={3} monotype>
          {formatTimestamp(tip.timestamp)}
        </StyledTimeText>
      </TableData>
    </TableRow>
  );
};

export default TipsTableRow;
