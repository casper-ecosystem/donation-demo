import React from 'react';
import {
  BodyText,
  FlexRow,
  formatNumber,
  motesToCSPR,
  SMALL_PRECISION
} from '@make-software/cspr-design';

interface PrizeCellProps {
  amount?: string;
}

export const PrizeCell: React.FC<PrizeCellProps> = ({ amount }) => {
  const prizeAmount = formatNumber(motesToCSPR(amount || '0'), {
    precision: SMALL_PRECISION
  });

  return (
    <FlexRow align={'center'}>
      <BodyText size={3} monotype>
        {prizeAmount} CSPR
      </BodyText>
    </FlexRow>
  );
};
