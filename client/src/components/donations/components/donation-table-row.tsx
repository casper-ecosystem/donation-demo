import { BodyText, TableData, TableRow } from '@make-software/cspr-design';
import PrizeCell from '../../common/prize-cell/prize-cell';
import { formatHash, formatTimestamp, HashLength } from '../../../utils/formatters';
import styled from 'styled-components';
import { HistoryLink } from '../../common/history-link/history-link';
import { Donation } from '../../../api/donation-requests';

const StyledMessageText = styled.div(({ theme }) =>
  theme.withMedia({
    width: '300px',
    maxWidth: '300px'
  })
);

const StyledContentBlock = styled(TableData)<{ width: number }>(({ theme, width }) =>
  theme.withMedia({
    width: [width + 'px'],
    maxWidth: [width + 'px'],
    minWidth: ['200px', 'unset', 'unset'],
    paddingLeft: '0',
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
    color: theme.styleguideColors.fillPrimaryBlue
  })
);

const DonationTableRow = ({ donation }: { donation: Donation }) => {
  const CSPR_LIVE_URL = process.env.REACT_APP_CSPR_LIVE_URL;
  const accountPath = `${CSPR_LIVE_URL}/transaction/${donation.transaction_hash}`;
  return (
    <TableRow key={donation.id}>
      <StyledContentBlock width={202}>
        <PrizeCell amount={donation.amount_cspr} />
      </StyledContentBlock>
      <StyledContentBlock width={320}>
        <StyledMessageText>{donation.message}</StyledMessageText>
      </StyledContentBlock>
      <StyledContentBlock width={323}>
        <HistoryLink href={accountPath} target={'_blank'} monotype>
          {formatHash(donation.transaction_hash, HashLength.SMALL)}
        </HistoryLink>
      </StyledContentBlock>
      <StyledContentBlock width={200}>
        <StyledTimeText size={3} monotype>
          {formatTimestamp(donation.timestamp)}
        </StyledTimeText>
      </StyledContentBlock>
    </TableRow>
  );
};

export default DonationTableRow;
