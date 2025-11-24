import React from 'react';
import {
  TableData,
  TableRow,
  formatHash,
  HashLength,
  formatTimestamp,
  BodyText,
  formatTimestampAge
} from '@make-software/cspr-design';

import { Tip } from '@/entities';
import { AccountInfoCell, HistoryLink, TokenAmountCell, Tooltip } from '@/components';

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
        <TokenAmountCell amount={tip.amount_cspr} />
      </TableData>
      <TableData>
        <StyledMessageText size={3} scale="sm">
          {tip.message}
        </StyledMessageText>
      </TableData>
      <TableData>
        <Tooltip tooltipContent={tip.transaction_hash}>
          <BodyText size={3} monotype>
            <HistoryLink href={accountPath} target={'_blank'} monotype>
              {formatHash(tip.transaction_hash, HashLength.TINY)}
            </HistoryLink>
          </BodyText>
        </Tooltip>
      </TableData>
      <TableData>
        <Tooltip tooltipContent={formatTimestamp(tip.timestamp)} monotype>
          <StyledTimeText size={3} noWrap>
            {formatTimestampAge(tip.timestamp)}
          </StyledTimeText>
        </Tooltip>
      </TableData>
    </TableRow>
  );
};
