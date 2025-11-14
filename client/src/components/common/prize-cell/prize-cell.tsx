import {
  BodyText,
  FlexRow,
  formatNumber,
  motesToCSPR,
  SMALL_PRECISION,
  TableData
} from '@make-software/cspr-design';

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
