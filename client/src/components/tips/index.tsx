import React from 'react';

import { Container, Section, TableTile } from '@/components';

import { TipsListProps, TipsTable } from './components';

export const TipsContainer: React.FC<TipsListProps> = ({ refetchSignal }) => {
  return (
    <Container>
      <Section>
        <TableTile title="Community Appreciation">
          <TipsTable refetchSignal={refetchSignal} />
        </TableTile>
      </Section>
    </Container>
  );
};
