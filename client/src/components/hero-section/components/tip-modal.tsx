import React from 'react';
import { useTheme } from 'styled-components';
import ReactModal from 'react-modal';
import LoadingIcon from 'assets/icons/loading.svg';

import {
  centerModalStyles,
  ModalContainer,
  ModalHeader, StatusContent,
} from '@/components';

import { TipForm } from './tip-form';

export const MODAL_SCREENS = {
  FORM: 'form',
  LOADING: 'loading',
  SUCCESS: 'success',
  CANCELLED: 'cancelled',
  ERROR: 'error',
} as const;

export type ModalScreen = typeof MODAL_SCREENS[keyof typeof MODAL_SCREENS] | null;

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
      case MODAL_SCREENS.LOADING:
        return <StatusContent
            iconSrc={LoadingIcon}
            title="Sending tip..."
        />
      case MODAL_SCREENS.SUCCESS:
        return <StatusContent
            title="You have successfully sent a tip!"
            subtitle="Thank you!"
        />
      case MODAL_SCREENS.CANCELLED:
        return <StatusContent
            title="Your sign has been canceled"
        />
      case MODAL_SCREENS.ERROR:
        return <StatusContent
            title="Something went wrong. Please try again."
        />
      case MODAL_SCREENS.FORM:
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
