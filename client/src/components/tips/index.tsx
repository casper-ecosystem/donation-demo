import React from 'react';

import { TableTile } from '@/components';

import { TipsListProps, TipsTable } from './components';

export const TipsList: React.FC<TipsListProps> = ({ refetchSignal }) => {
  return (
    <TableTile title="">
      <TipsTable refetchSignal={refetchSignal} />
    </TableTile>
  );
};
