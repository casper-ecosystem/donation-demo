import React from 'react';
import Container from '../common/container/container';
import DonationsList from '../tips/tips';
import { Section } from "../common/section/section";

interface TipsContainerProps {
  updateViewFlag: boolean;
}

export const TipsContainer = ({ updateViewFlag }: TipsContainerProps) => {
  return (
    <Container>
      <h3>✨ Previously tips</h3>
      <Section>
        <DonationsList updateViewFlag={updateViewFlag} />
      </Section>
    </Container>
  );
};
