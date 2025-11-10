import React from 'react';
import { Section } from './components';
import Container from '../container';
import DonationsList from '../donations/donations';

interface LandingBriefProps {
  updateViewFlag: boolean;
}

export const LandingBrief = ({ updateViewFlag }: LandingBriefProps) => {
  return (
    <Container>
      <h3>✨ Your donations</h3>
      <Section>
        <DonationsList updateViewFlag={updateViewFlag} />
      </Section>
    </Container>
  );
};
