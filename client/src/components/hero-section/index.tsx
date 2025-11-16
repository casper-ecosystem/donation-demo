import styled from 'styled-components';
import desktopBgImage from 'assets/backgrounds/bg-desktop-full.jpg';
import mobileBgImage from 'assets/backgrounds/bg-mobile-full.jpg';
import { useState } from 'react';
import { TransactionStatus } from '@make-software/csprclick-core-types';
import { useClickRef } from '@make-software/csprclick-ui';
import { TipModal, ModalScreen } from './components/tip-modal';
import { buildTipTransaction } from 'utils/tip-transaction';

interface WelcomeProps {
  isConnected: boolean;
  onUpdateTipsList: () => void;
}

const Container = styled.section(({ theme }) =>
  theme.withMedia({
    backgroundImage: [
      `url("${mobileBgImage}")`,
      `url("${desktopBgImage}")`,
      `url("${desktopBgImage}")`
    ],
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'right',
    height: ['393px', '424px', '424px'],
    width: '100%'
  })
);

const StyledSvgIcon = styled.div<{ theme: any }>(({ theme }) =>
  theme.withMedia({
    svg: {
      height: ['60px', '80px', '80px'],
      width: ['60px', '80px', '80px'],
      path: { fill: theme.clickLogo }
    }
  })
);

const StyledWrapper = styled.div(({ theme }) =>
  theme.withMedia({
    width: '100%',
    maxWidth: ['540px', '720px', '1200px'],
    padding: '0 12px',
    margin: '0 auto'
  })
);

const InfoContainer = styled.div(({ theme }) =>
  theme.withMedia({
    display: 'flex'
  })
);
const StyledInfo = styled.div(({ theme }) =>
  theme.withMedia({
    position: 'relative',
    top: ['120px', '174px', '174px']
  })
);

const GreetingText = styled.div(({ theme }) =>
  theme.withMedia({
    color: '#DADCE5',
    fontSize: ['24px', '40px', '40px'],
    fontWeight: '600',
    lineHeight: ['32px', '56px', '56px'],
    marginTop: ['24px', '40px', '40px']
  })
);

const KillerAppText = styled.div(({ theme }) =>
  theme.withMedia({
    color: '#A8ADBF',
    fontSize: '16px',
    fontWeight: '200',
    lineHeight: '24px',
    marginTop: '8px',
    width: ['81%', '100%', '100%']
  })
);

const LearnMoreButton = styled.div(({ theme }) =>
  theme.withMedia({
    display: 'flex',
    justifyContent: 'center',
    alignItem: 'center',
    width: '176px',
    height: '36px',
    padding: '8px 16px',
    borderRadius: '4px',
    backgroundColor: '#B2332D',
    fontSize: '14px',
    lineHeight: '20px',
    color: '#F2F2F2',
    marginTop: '32px',

    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#9f211c'
    }
  })
);

export const HeroSection = ({ isConnected, onUpdateTipsList }: WelcomeProps) => {
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
      console.log('STATUS UPDATE', status, data);
      if (status === TransactionStatus.CANCELLED) {
        setModalScreen('cancelled');
      }
      if (status === TransactionStatus.PROCESSED) {
        if (data.csprCloudTransaction?.error_message === null) {
          setModalScreen('success');
          setTimeout(() => onUpdateTipsList(), 4000);
        } else {
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

export default HeroSection;
