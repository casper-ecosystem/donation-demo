import styled from 'styled-components';
import { useState } from 'react';
import { StyledInput } from 'components/common/modal-styles';
import { BodyText, Button, FlexColumn, FlexRow, Textarea } from '@make-software/cspr-design';

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

interface TipFormProps {
  onConfirm: (amount: string, message: string) => void;
}

export const TipForm = ({ onConfirm }: TipFormProps) => {
  const [amount, setAmount] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [formErrors, setFormErrors] = useState<Record<'amount' | 'message', string>>({
    amount: '',
    message: ''
  });

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

    if (!formErrors.amount && !formErrors.message) {
      onConfirm(amount, message);
    }
  };

  return (
    <FlexColumn gap={25}>
      <FlexRow>
        <StyledInput
          value={amount}
          label={
            <BodyText size={1} variation={'black'}>
              Tip
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
  );
};
