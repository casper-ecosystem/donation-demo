import React from 'react';

import { Container, Section, TableTile } from '@/components';

import { TipsListProps, TipsTable } from './components';

export const TipsContainer: React.FC<TipsListProps> = ({ refetchSignal }) => {
  return (
    <Container>
      <h3>Community Appreciation</h3>
      <Section>
        <TableTile title="">
          <TipsTable refetchSignal={refetchSignal} />
        </TableTile>
      </Section>
    </Container>
  );
};
