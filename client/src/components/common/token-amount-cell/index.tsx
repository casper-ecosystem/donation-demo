import React from 'react';
import { BodyText, formatNumber, motesToCSPR, SMALL_PRECISION } from '@make-software/cspr-design';

interface TokenAmountCellProps {
  amount?: string;
}

export const TokenAmountCell: React.FC<TokenAmountCellProps> = ({ amount }) => {
  const formattedAmount = formatNumber(motesToCSPR(amount || '0'), {
    precision: SMALL_PRECISION
  });

  return (
    <BodyText size={3} monotype noWrap>
      {formattedAmount} CSPR
    </BodyText>
  );
};
