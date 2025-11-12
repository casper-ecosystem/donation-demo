import React, { useEffect } from 'react';
import Container from 'components/common/container/container';
import TipsList from '../tips/tips';
import { Section } from 'components/common/section/section';

interface TipsContainerProps {
  refetchSignal: number;
}

export const TipsContainer = ({ refetchSignal }: TipsContainerProps) => {
  return (
    <Container>
      <h3>Community Appreciation</h3>
      <Section>
        <TipsList refetchSignal={refetchSignal} />
      </Section>
    </Container>
  );
};
