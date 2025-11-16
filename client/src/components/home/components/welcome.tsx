import styled, { useTheme } from 'styled-components';
import desktopBgImage from 'assets/backgrounds/bg-desktop-full.jpg';
import mobileBgImage from 'assets/backgrounds/bg-mobile-full.jpg';
import { centerModalStyles, ModalContainer } from 'components/common/modal-styles';
import { useState } from 'react';
import ReactModal from 'react-modal';
import { ModalHeader } from '@make-software/cspr-design';
import { TransactionStatus } from '@make-software/csprclick-core-types';
import { useClickRef } from '@make-software/csprclick-ui';
import { LoadingContent } from 'components/common/loading-content/loading-content';
import { SuccessContent } from 'components/common/success-content/success-content';
import { CanceledContent } from 'components/common/canceled-content/canceled-content';
import { ErrorContent } from 'components/common/error-content/error-content';
import { TipForm } from './tip-form';
import {buildTipTransaction} from "utils/tip-transaction";

interface WelcomeProps {
  isConnected: boolean;
  onUpdateTipsList: () => void;
}

const Container = styled.div(({ theme }) =>
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

type ModalScreen = 'form' | 'loading' | 'success' | 'cancelled' | 'error' | null;

export const Welcome = ({ isConnected, onUpdateTipsList }: WelcomeProps) => {
  const theme = useTheme();
  const modalStyles = {
    overlay: {
      backgroundColor: theme.styleguideColors.backgroundOverlay,
      zIndex: 15
    },
    content: {
      ...centerModalStyles,
      ...{
        paddingTop: '20px',
        border: 'none',
        backgroundColor: theme.styleguideColors.backgroundPrimary,
        borderTop: `4px solid ${theme.styleguideColors.contentRed}`,
        borderColor: theme.styleguideColors.contentRed,
        boxShadow: '0px 16px 48px rgba(26, 25, 25, 0.2)'
      }
    }
  };

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
      <ReactModal
        isOpen={modalScreen !== null}
        onRequestClose={() => setModalScreen(null)}
        style={modalStyles}
        shouldCloseOnEsc
        shouldCloseOnOverlayClick
      >
        <ModalContainer>
          <ModalHeader onClose={() => setModalScreen(null)} marginBottom={'0'} />
          {modalScreen === 'loading' ? (
            <LoadingContent />
          ) : modalScreen === 'success' ? (
            <SuccessContent />
          ) : modalScreen === 'cancelled' ? (
            <CanceledContent />
          ) : modalScreen === 'error' ? (
            <ErrorContent />
          ) : (
            <TipForm onConfirm={handleSignTransaction} />
          )}
        </ModalContainer>
      </ReactModal>
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
