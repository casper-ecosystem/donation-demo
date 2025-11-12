import React from 'react';
import Container from 'components/common/container/container';
import DonationsList from '../tips/tips';
import { Section } from 'components/common/section/section';

interface TipsContainerProps {
  updateViewFlag: boolean;
}

export const TipsContainer = ({ updateViewFlag }: TipsContainerProps) => {
  return (
    <Container>
      <h3>Community Appreciation</h3>
      <Section>
        <DonationsList updateViewFlag={updateViewFlag} />
      </Section>
    </Container>
  );
};
