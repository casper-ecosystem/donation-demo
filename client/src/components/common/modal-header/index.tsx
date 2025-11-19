import React from 'react';
import { ThemeModeType } from '@make-software/csprclick-ui';

import CloseIcon from 'assets/icons/close.svg';

import { CloseButton, ModalHeaderContainer, StyledSvg } from './styled';

export interface ModalHeaderProps {
  onClose?: () => void;
  headerLogo?: React.ReactElement;
  themeMode?: ThemeModeType;
  marginBottom?: string;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ onClose, headerLogo, marginBottom }) => {
  return (
    <ModalHeaderContainer
      justify={headerLogo ? 'space-between' : 'end'}
      align="center"
      marginBottom={marginBottom}>
      {headerLogo && headerLogo}
      {onClose && (
        <CloseButton onClick={onClose}>
          <StyledSvg src={CloseIcon} size={20} />
        </CloseButton>
      )}
    </ModalHeaderContainer>
  );
};
