import React, { useState } from 'react';
import { TransactionStatus } from '@make-software/csprclick-core-types';
import { useClickRef } from '@make-software/csprclick-ui';

import { buildTipTransaction } from '@/utils';

import { TipModal, ModalScreen } from './components';
import {
  Container,
  GreetingText,
  InfoContainer,
  KillerAppText,
  LearnMoreButton,
  StyledInfo,
  StyledWrapper
} from './styled';

interface WelcomeProps {
  isConnected: boolean;
  onUpdateTipsList: () => void;
}

export const HeroSection: React.FC<WelcomeProps> = ({ isConnected, onUpdateTipsList }) => {
  const [modalScreen, setModalScreen] = useState<ModalScreen>(null);

  const clickRef = useClickRef();
  const activeAccount = clickRef?.getActiveAccount();

  const handleSendTipClick = () => {
    if (isConnected) {
      setModalScreen('form');
    } else {
      window.csprclick.signIn();
    }
  };

  const handleSignTransaction = async (amount: string, message: string) => {
    const sender = activeAccount?.public_key?.toLowerCase() || '';

    const tipTransaction = await buildTipTransaction(sender, amount, message);

    const onStatusUpdate = (status: string, data: any) => {
      if (status === TransactionStatus.CANCELLED) {
        setModalScreen('cancelled');
      }
      if (status === TransactionStatus.ERROR) {
        console.error('Error: ', data?.error + '(' + data?.errorData + ')');
        setModalScreen('error');
      }
      if (status === TransactionStatus.PROCESSED) {
        if (data.csprCloudTransaction?.error_message === null) {
          setModalScreen('success');
          setTimeout(() => onUpdateTipsList(), 4000);
        } else {
          console.error('Error: ', data?.error + '(' + data?.errorData + ')');
          setModalScreen('error');
        }
      }
    };

    setModalScreen('loading');

    clickRef?.send(tipTransaction, sender, onStatusUpdate).catch((err: any) => {
      setModalScreen('error');
      alert('Error: ' + err);
    });
  };

  return (
    <Container>
      <TipModal
        modalScreen={modalScreen}
        onClose={() => setModalScreen(null)}
        onConfirm={handleSignTransaction}
      />
      <StyledWrapper>
        <InfoContainer>
          <StyledInfo>
            <GreetingText>Tip the barista</GreetingText>
            <KillerAppText>
              Say thanks. Support the developer. Keep open-source thriving.
            </KillerAppText>
            <LearnMoreButton onClick={handleSendTipClick}>
              {isConnected ? 'Send a tip' : 'Connect Wallet'}
            </LearnMoreButton>
          </StyledInfo>
        </InfoContainer>
      </StyledWrapper>
    </Container>
  );
};
