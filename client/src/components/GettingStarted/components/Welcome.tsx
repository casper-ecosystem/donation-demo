import styled, { useTheme } from 'styled-components';
import desktopBgImage from '../../../bg-desktop-full.jpg';
import mobileBgImage from '../../../bg-mobile-full.jpg';
import { centerModalStyles, ModalContainer, StyledInput } from '../../common/modal-styles';
import { useState } from 'react';
import ReactModal from 'react-modal';
import { BodyText, Button, FlexRow, Textarea } from '@make-software/cspr-design';
import { makeTransferTransaction } from "./transfer-deploy";
import { TransactionStatus } from "@make-software/csprclick-core-types";
import { SendResult } from "@make-software/csprclick-core-client";
import { useClickRef } from "@make-software/csprclick-ui";
import {
    Args,
    HttpHandler,
    RpcClient,
    CLValue,
    SessionBuilder,
    CLTypeUInt8,
    Hash, PublicKey, Transaction, TransactionV1,
} from "casper-js-sdk";

const API_URL = process.env.REACT_APP_API_URL;

interface WelcomeProps {
  isConnected: boolean;
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
    maxWidth: ['540px', '720px', '960px'],
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

export const Welcome = ({ isConnected }: WelcomeProps) => {
  const theme = useTheme();
  const modalStyle = {
    overlay: {
      backgroundColor: theme.styleguideColors.backgroundOverlay,
      zIndex: 15
    },
    content: {
      ...centerModalStyles,
      ...{
        border: 'none',
        backgroundColor: theme.styleguideColors.backgroundPrimary,
        borderTop: `4px solid ${theme.styleguideColors.contentRed}`,
        borderColor: theme.styleguideColors.contentRed,
        boxShadow: '0px 16px 48px rgba(26, 25, 25, 0.2)'
      }
    }
  };

    const recipientPk = '0203596b49460de7900614b5e25a1fa1861b3eb944c42bea18fc7506b220fd4d9d61';

  const [showDonationModal, setShowDonationModal] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>('');
  const [message, setMessage] = useState<string>('');

    const [transactionHash, setTransactionHash] = useState<string | undefined>(undefined);
    const [waitingResponse, setWaitingResponse] = useState<boolean>(false);


  const [formErrors, setFormErrors] = useState<Record<'amount' | 'message', string | string>>({
    amount: '',
    message: ''
  });

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
        const result = await fetch(`${API_URL}/api/proxy-wasm`);
        if (!result.ok) {
            throw new Error(await result.text());
        }
        const buffer = await result.arrayBuffer();
        return new Uint8Array(buffer);
    };


  const handleSignTransaction = async (evt: any) => {
        evt.preventDefault();
        const sender = activeAccount?.public_key?.toLowerCase() || '';
        // const transaction = makeTransferTransaction(
        //     sender,
        //     recipientPk,
        //     // '50' + '000000000',
        //     amount,
        //     clickRef.chainName!
        // );
        // debugger;
        // console.log('TRANSACTION', transaction);
        // ////

      // const owner = sender.toString();
      const contractWasm = await getProxyWASM();
      // const contractWasm = await fs.readFile(options.proxy_caller);

      const tipArgs = Args.fromMap({
          praise: CLValue.newCLString(message),
      });
      const serialized_args = CLValue.newCLList(
          CLTypeUInt8,
          Array.from(tipArgs.toBytes()).map((value) => CLValue.newCLUint8(value))
      );

      const args = Args.fromMap({
          amount: CLValue.newCLUInt512(amount + '000000000'),
          attached_value: CLValue.newCLUInt512(amount + '000000000'),
          entry_point: CLValue.newCLString("tip_the_barista"),
          package_hash: CLValue.newCLByteArray(
              Hash.fromHex('ca0f4eedc84e03b6bc39ce664ef05dff00a96214194e706d50bfc43d84124035').toBytes()
          ),
          args: serialized_args,
      });

      const sessionTransaction = new SessionBuilder()
          .from(PublicKey.fromHex(sender))
          // .from(sender)
          .runtimeArgs(args)
          .wasm(new Uint8Array(contractWasm))
          .payment(12000000000) // Amount in motes
          .chainName(clickRef.chainName!)
          .build();


      // sessionTransaction.toJSON()
        ////
      // { transaction: { Version1: TransactionV1.toJSON(transaction.getTransactionV1()!) } }
        // signAndSend(sessionTransaction.toJSON() as object, sender);
        signAndSend({ transaction: { Version1: TransactionV1.toJSON(sessionTransaction.getTransactionV1()!) } } as object, sender);
    };

    const signAndSend = (tbs: object, sender: string) => {
        const onStatusUpdate = (status: string, data: any) => {
            console.log('STATUS UPDATE', status, data);
            if (status === TransactionStatus.SENT) setWaitingResponse(true);
        };
        debugger;

        clickRef
            ?.send(tbs, sender, onStatusUpdate)
            .then((res: SendResult | undefined) => {
                setWaitingResponse(false);
                if (res?.transactionHash) {
                    setTransactionHash(res.transactionHash);
                    alert(
                        'Transaction sent successfully: ' +
                        res.transactionHash +
                        '\n Status: ' +
                        res.status +
                        '\n Timestamp: ' +
                        res.csprCloudTransaction.timestamp
                    );
                } else if (res?.cancelled) {
                    alert('Sign cancelled');
                } else {
                    alert('Error in send(): ' + res?.error + '\n' + res?.errorData);
                }
            })
            .catch((err: any) => {
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

    !formErrors.amount && !formErrors.message && handleSignTransaction(ev)
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
        <ModalContainer gap={25}>
          <FlexRow>
            <StyledInput
              value={amount}
              label={<BodyText size={1}>Donate</BodyText>}
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
              label={<BodyText size={1}>Message</BodyText>}
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
            <GreetingText>Buy Me a Coffee</GreetingText>
            <KillerAppText>Some subtitle description text.</KillerAppText>
            <LearnMoreButton
              onClick={isConnected ? handleOpenDonationModal : handleOpenConnectAccountModal}
            >
              {isConnected ? 'Buy' : 'Connect Wallet'}
            </LearnMoreButton>
          </StyledInfo>
        </InfoContainer>
      </StyledWrapper>
    </Container>
  );
};
