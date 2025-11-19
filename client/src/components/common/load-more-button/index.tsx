import React from 'react';

import { Button } from '@make-software/cspr-design';

import { ButtonContainer } from './styled';

interface LoadMoreButtonProps {
  handleLoadMore: () => void;
  handleReset: () => void;
  isCollapsed: boolean;
}

export const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  handleLoadMore,
  handleReset,
  isCollapsed
}) => {
  const onClick = isCollapsed ? handleLoadMore : handleReset;
  const label = isCollapsed ? 'Load more' : 'Load less';

  return (
    <ButtonContainer>
      <Button color="secondaryRed" onClick={onClick}>
        {label}
      </Button>
    </ButtonContainer>
  );
};
