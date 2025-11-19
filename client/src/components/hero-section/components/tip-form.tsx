import React, { useState } from 'react';
import { BodyText, FlexColumn, FlexRow } from '@make-software/cspr-design';

import { StyledInput } from '@/components';

import { StyledButton, StyledTextArea } from './styled';

interface TipFormProps {
  onConfirm: (amount: string, message: string) => void;
}

export const TipForm: React.FC<TipFormProps> = ({ onConfirm }) => {
  const [amount, setAmount] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [formErrors, setFormErrors] = useState<Record<'amount' | 'message', string>>({
    amount: '',
    message: ''
  });

  const handleFillAmount = (value: string) => {
    setAmount(value);
    setFormErrors((prev) => ({ ...prev, amount: '' }));
  };

  const handleAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;

    setFormErrors((prev) => ({ ...prev, amount: '' }));

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
      setMessage(val);
      setFormErrors((prev) => ({ ...prev, message: '' }));
    } else {
      setFormErrors((prev) => ({
        ...prev,
        message: 'Max limit reached (180 symbols)'
      }));
    }
  };

  const handleConfirm = () => {
    const nextErrors: Record<'amount' | 'message', string> = { amount: '', message: '' };

    if (!amount.length) {
      nextErrors.amount = 'This field is required';
    }

    if (!message.length) {
      nextErrors.message = 'This field is required';
    }

    if (nextErrors.amount || nextErrors.message) {
      setFormErrors(nextErrors);
      return;
    }

    onConfirm(amount, message);
  };

  const hasErrors = Boolean(formErrors.amount || formErrors.message);
  const isIncomplete = !amount.length || !message.length;

  return (
    <FlexColumn gap={25}>
      <FlexRow>
        <StyledInput
          value={amount}
          label={
            <BodyText size={1} variation="black">
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
            <BodyText size={1} variation="black">
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
        <StyledButton disabled={hasErrors || isIncomplete} onClick={handleConfirm}>
          Send
        </StyledButton>
      </FlexRow>
    </FlexColumn>
  );
};
