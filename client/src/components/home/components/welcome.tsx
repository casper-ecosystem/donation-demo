import styled, { useTheme } from 'styled-components';
import desktopBgImage from 'assets/backgrounds/bg-desktop-full.jpg';
import mobileBgImage from 'assets/backgrounds/bg-mobile-full.jpg';
import { centerModalStyles, ModalContainer, StyledInput } from 'components/common/modal-styles';
import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import {
  BodyText,
  Button,
  FlexColumn,
  FlexRow,
  ModalHeader,
  Textarea
} from '@make-software/cspr-design';
import { TransactionStatus, SendResult } from '@make-software/csprclick-core-types';
import { useClickRef } from '@make-software/csprclick-ui';
import {
  Args,
  CLValue,
  SessionBuilder,
  CLTypeUInt8,
  Hash,
  PublicKey,
  TransactionV1
} from 'casper-js-sdk';
import { LoadingContent } from 'components/common/loading-content/loading-content';
import { SuccessContent } from 'components/common/success-content/success-content';
import { CanceledContent } from 'components/common/canceled-content/canceled-content';
import { ErrorContent } from 'components/common/error-content/error-content';

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
    height: ['693px', '624px', '624px'],
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
const StyledButton = styled(Button)(({ theme }) =>
  theme.withMedia({
    cursor: 'pointer'
  })
);

const StyledTextArea = styled(Textarea)(({ theme }) =>
  theme.withMedia({
    width: '100%'
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

export const Welcome = ({ isConnected, onUpdateTipsList }: WelcomeProps) => {
  const theme = useTheme();
  const modalStyle = {
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

  const API_URL = config.donation_api_url;

  const [showDonationModal, setShowDonationModal] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const [loadingScreen, setLoadingScreen] = useState<boolean>(false);
  const [successScreen, setSuccessScreen] = useState<boolean>(false);
  const [canceledScreen, setCanceledScreen] = useState<boolean>(false);
  const [errorScreen, setErrorScreen] = useState<boolean>(false);

  const [formErrors, setFormErrors] = useState<Record<'amount' | 'message', string | string>>({
    amount: '',
    message: ''
  });

  useEffect(() => {}, [successScreen]);

  const clickRef = useClickRef();
  const activeAccount = clickRef?.getActiveAccount();

  const clearForm = () => {
    setAmount('');
    setMessage('');
    setFormErrors({
      ...formErrors,
      amount: '',
      message: ''
    });
  };

  useEffect(() => {
    setLoadingScreen(false);
    setErrorScreen(false);
    setCanceledScreen(false);
    setSuccessScreen(false);
  }, [showDonationModal]);

  const handleOpenDonationModal = () => {
    setShowDonationModal(true);
    clearForm();
  };

  const handleCloseDonationModal = () => {
    setShowDonationModal(false);
  };

  const handleOpenConnectAccountModal = () => {
    window.csprclick.signIn();
  };

  const handleFillAmount = (amount: string) => {
    setFormErrors({
      ...formErrors,
      amount: ''
    });
    setAmount(amount);
  };

  const handleAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;

    setFormErrors({
      ...formErrors,
      amount: ''
    });

    if (val === '') {
      setAmount(val);
      return;
    }

    if (/^(?!0$)(?!0\.0*$)\d*\.?\d*$/.test(val)) {
      setAmount(val);
    }
  };

  const handleOnKeyDownAmount = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];

    if (allowedKeys.includes(event.key)) return;

    if (event.key === '.') {
      const value = (event.target as HTMLInputElement).value;
      if (value.includes('.') || value === '') {
        event.preventDefault();
      }
      return;
    }

    if (/[0-9]/.test(event.key)) return;

    event.preventDefault();
  };

  const handleMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;

    if (val.length <= 180) {
      setFormErrors({
        ...formErrors,
        message: ''
      });
      setMessage(val);
      setFormErrors({
        ...formErrors,
        message: ''
      });
    } else {
      setFormErrors({
        ...formErrors,
        message: 'Max limit reached (180 symbols)'
      });
    }
  };

  const getProxyWASM = async (): Promise<Uint8Array> => {
    const result = await fetch(`${API_URL}/proxy-wasm`);
    if (!result.ok) {
      throw new Error(await result.text());
    }
    const buffer = await result.arrayBuffer();
    return new Uint8Array(buffer);
  };

  const handleSignTransaction = async (evt: any) => {
    evt.preventDefault();
    setErrorScreen(false);
    const sender = activeAccount?.public_key?.toLowerCase() || '';
    const contractWasm = await getProxyWASM();

    const tipArgs = Args.fromMap({
      praise: CLValue.newCLString(message)
    });
    const serialized_args = CLValue.newCLList(
      CLTypeUInt8,
      Array.from(tipArgs.toBytes()).map((value) => CLValue.newCLUint8(value))
    );

    const args = Args.fromMap({
      amount: CLValue.newCLUInt512(amount + '000000000'),
      attached_value: CLValue.newCLUInt512(amount + '000000000'),
      entry_point: CLValue.newCLString('tip_the_barista'),
      package_hash: CLValue.newCLByteArray(
        Hash.fromHex('ca0f4eedc84e03b6bc39ce664ef05dff00a96214194e706d50bfc43d84124035').toBytes()
      ),
      args: serialized_args
    });

    const sessionTransaction = new SessionBuilder()
      .from(PublicKey.fromHex(sender))
      .runtimeArgs(args)
      .wasm(new Uint8Array(contractWasm))
      .payment(12000000000) // Amount in motes
      .chainName(clickRef.chainName!)
      .build();

    signAndSend(
      {
        transaction: { Version1: TransactionV1.toJSON(sessionTransaction.getTransactionV1()!) }
      } as object,
      sender
    );
  };

  const signAndSend = (tbs: object, sender: string) => {
    setLoadingScreen(true);
    const onStatusUpdate = (status: string, data: any) => {
      console.log('STATUS UPDATE', status, data);
      if (status === TransactionStatus.PROCESSED) {
        setTimeout(() => onUpdateTipsList(), 4000);
      }
    };

    clickRef
      ?.send(tbs, sender, onStatusUpdate)
      .then((res: SendResult | undefined) => {
        if (res?.transactionHash) {
          setLoadingScreen(false);
          setSuccessScreen(true);
        } else if (res?.cancelled) {
          setCanceledScreen(true);
          setLoadingScreen(false);
          setShowDonationModal(false);
        } else {
          setLoadingScreen(false);
          setShowDonationModal(false);
          setErrorScreen(true);
        }
      })
      .catch((err: any) => {
        setErrorScreen(true);
        setLoadingScreen(false);
        setShowDonationModal(false);
        setSuccessScreen(false);
        setCanceledScreen(false);
        alert('Error: ' + err);
        throw err;
      });
  };

  const handleConfirm = (ev: any) => {
    if (!amount.length) {
      setFormErrors({
        ...formErrors,
        amount: 'This field is required'
      });
      return;
    }

    if (!message.length) {
      setFormErrors({
        ...formErrors,
        message: 'This field is required'
      });
      return;
    }

    !formErrors.amount && !formErrors.message && handleSignTransaction(ev);
  };

  return (
    <Container>
      <ReactModal
        isOpen={showDonationModal}
        onRequestClose={handleCloseDonationModal}
        style={modalStyle}
        shouldCloseOnEsc
        shouldCloseOnOverlayClick
      >
        <ModalContainer>
          <ModalHeader onClose={handleCloseDonationModal} marginBottom={'0'} />
          {loadingScreen ? (
            <LoadingContent />
          ) : successScreen ? (
            <SuccessContent />
          ) : canceledScreen ? (
            <CanceledContent />
          ) : errorScreen ? (
            <ErrorContent />
          ) : (
            <FlexColumn gap={25}>
              <FlexRow>
                <StyledInput
                  value={amount}
                  label={
                    <BodyText size={1} variation={'black'}>
                      Tips
                    </BodyText>
                  }
                  placeholder="CSPR Amount"
                  onChange={handleAmount}
                  onKeyDown={handleOnKeyDownAmount}
                  error={!!formErrors.amount}
                  validationText={formErrors.amount}
                />
              </FlexRow>
              <FlexRow gap={10}>
                <StyledButton onClick={() => handleFillAmount('50')}>50</StyledButton>
                <StyledButton onClick={() => handleFillAmount('250')}>250</StyledButton>
                <StyledButton onClick={() => handleFillAmount('1000')}>1000</StyledButton>
              </FlexRow>
              <FlexRow>
                <StyledTextArea
                  value={message}
                  label={
                    <BodyText size={1} variation={'black'}>
                      Message
                    </BodyText>
                  }
                  placeholder="Your Message"
                  onChange={handleMessage}
                  error={!!formErrors.message}
                  validationText={formErrors.message}
                />
              </FlexRow>
              <FlexRow>
                <StyledButton
                  disabled={Boolean(formErrors.amount || formErrors.message)}
                  onClick={(e) => handleConfirm(e)}
                >
                  Send
                </StyledButton>
              </FlexRow>
            </FlexColumn>
          )}
        </ModalContainer>
      </ReactModal>
      <StyledWrapper>
        <InfoContainer>
          <StyledInfo>
            <StyledSvgIcon className="App-logo">
              <svg
                width="86"
                height="88"
                viewBox="0 0 86 88"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M81.8224 32.5H59.9999C58.6192 32.5 57.4999 31.3807 57.4999 30L57.4999 25.1761C57.4999 18.9556 50.3633 15.4389 45.4306 19.2287L20.2789 38.5526C16.3713 41.5548 16.3713 47.4452 20.2789 50.4474L45.4306 69.7713C50.3633 73.5611 57.4999 70.0444 57.4999 63.8239L57.4999 58C57.4999 56.6193 58.6192 55.5 59.9999 55.5H81.8224C83.4952 55.5 84.4995 57.0016 84.0259 58.3246C78.1465 74.7511 62.4434 86.5 44 86.5C20.5279 86.5 1.5 67.4721 1.5 44C1.5 20.5279 20.5279 1.5 44 1.5C62.4434 1.5 78.1465 13.2489 84.0259 29.6754C84.4995 30.9984 83.4952 32.5 81.8224 32.5Z"
                  strokeWidth="3"
                />
              </svg>
            </StyledSvgIcon>
            <GreetingText>Tip the barista</GreetingText>
            <KillerAppText>
              Say thanks. Support the developer. Keep open-source thriving.
            </KillerAppText>
            <LearnMoreButton
              onClick={isConnected ? handleOpenDonationModal : handleOpenConnectAccountModal}
            >
              {isConnected ? 'Send a tip' : 'Connect Wallet'}
            </LearnMoreButton>
          </StyledInfo>
        </InfoContainer>
      </StyledWrapper>
    </Container>
  );
};
