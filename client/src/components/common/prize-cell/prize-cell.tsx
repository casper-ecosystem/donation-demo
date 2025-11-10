import styled from 'styled-components';
import { BodyText, FlexRow, SvgIcon, TableData } from '@make-software/cspr-design';
import { formatNumber } from '../../../utils/formatters';
import { motesToCSPR } from '../../../utils/currency';
import { SMALL_PRECISION } from '../../../constants';

const StyledSvgIcon = styled(SvgIcon)(({ theme }) => ({
  marginLeft: 10,
  path: {
    fill: theme.styleguideColors.contentLightBlue
  }
}));

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
