import { BodyText, FlexRow, TableData } from '@make-software/cspr-design';
import { formatNumber } from 'utils/formatters';
import { motesToCSPR } from 'utils/currency';
import { SMALL_PRECISION } from '../../../constants';

interface PrizeCellProps {
  amount?: string;
}

export const PrizeCell = ({ amount }: PrizeCellProps) => {
  const prizeAmount = formatNumber(motesToCSPR(amount || '0'), {
    precision: SMALL_PRECISION
  });
  return (
    <TableData align="right">
      <FlexRow align={'center'} justify={'flex-end'}>
        <BodyText size={3}>{prizeAmount} CSPR</BodyText>
      </FlexRow>
    </TableData>
  );
};

export default PrizeCell;
