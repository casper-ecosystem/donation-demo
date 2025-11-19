import React from 'react';
import {
  TableData,
  TableRow,
  formatHash,
  HashLength,
  formatTimestamp
} from '@make-software/cspr-design';

import { Tip } from '@/entities';
import { AccountInfoCell, HistoryLink, PrizeCell } from '@/components';

import { StyledMessageText, StyledTimeText } from './styled';

interface TipsTableRowProps {
  tip: Tip;
}

export const TipsTableRow: React.FC<TipsTableRowProps> = ({ tip }) => {
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
