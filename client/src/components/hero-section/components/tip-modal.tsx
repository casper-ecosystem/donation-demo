import React from 'react';
import { useTheme } from 'styled-components';
import ReactModal from 'react-modal';

import {
  CanceledContent,
  centerModalStyles,
  ErrorContent,
  LoadingContent,
  ModalContainer,
  ModalHeader,
  SuccessContent
} from '@/components';

import { TipForm } from './tip-form';

export type ModalScreen = 'form' | 'loading' | 'success' | 'cancelled' | 'error' | null;

interface TipModalProps {
  modalScreen: ModalScreen;
  onClose: () => void;
  onConfirm: (amount: string, message: string) => void;
}

export const TipModal: React.FC<TipModalProps> = ({ modalScreen, onClose, onConfirm }) => {
  const theme = useTheme();

  const modalStyles: ReactModal.Styles = {
    overlay: {
      backgroundColor: theme.styleguideColors.backgroundOverlay,
      zIndex: 15
    },
    content: {
      ...centerModalStyles,
      paddingTop: '20px',
      border: 'none',
      backgroundColor: theme.styleguideColors.backgroundPrimary,
      borderTop: `4px solid ${theme.styleguideColors.contentRed}`,
      borderColor: theme.styleguideColors.contentRed,
      boxShadow: '0px 16px 48px rgba(26, 25, 25, 0.2)'
    }
  };

  const renderContent = () => {
    switch (modalScreen) {
      case 'loading':
        return <LoadingContent />;
      case 'success':
        return <SuccessContent />;
      case 'cancelled':
        return <CanceledContent />;
      case 'error':
        return <ErrorContent />;
      case 'form':
      default:
        return <TipForm onConfirm={onConfirm} />;
    }
  };

  return (
    <ReactModal
      isOpen={modalScreen !== null}
      onRequestClose={onClose}
      style={modalStyles}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick>
      <ModalContainer>
        <ModalHeader onClose={onClose} marginBottom="0" />
        {renderContent()}
      </ModalContainer>
    </ReactModal>
  );
};
