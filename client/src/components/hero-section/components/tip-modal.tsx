import { useTheme } from 'styled-components';
import ReactModal from 'react-modal';
import { ModalHeader } from '@make-software/cspr-design';
import { centerModalStyles, ModalContainer } from 'components/common/modal-styles';
import { LoadingContent } from 'components/common/loading-content/loading-content';
import { SuccessContent } from 'components/common/success-content/success-content';
import { CanceledContent } from 'components/common/canceled-content/canceled-content';
import { ErrorContent } from 'components/common/error-content/error-content';
import { TipForm } from './tip-form';

export type ModalScreen = 'form' | 'loading' | 'success' | 'cancelled' | 'error' | null;

interface TipModalProps {
  modalScreen: ModalScreen;
  onClose: () => void;
  onConfirm: (amount: string, message: string) => void;
}

export const TipModal = ({ modalScreen, onClose, onConfirm }: TipModalProps) => {
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

  return (
    <ReactModal
      isOpen={modalScreen !== null}
      onRequestClose={onClose}
      style={modalStyles}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
    >
      <ModalContainer>
        <ModalHeader onClose={onClose} marginBottom={'0'} />
        {modalScreen === 'loading' ? (
          <LoadingContent />
        ) : modalScreen === 'success' ? (
          <SuccessContent />
        ) : modalScreen === 'cancelled' ? (
          <CanceledContent />
        ) : modalScreen === 'error' ? (
          <ErrorContent />
        ) : (
          <TipForm onConfirm={onConfirm} />
        )}
      </ModalContainer>
    </ReactModal>
  );
};
