import React from 'react';
import { FlexColumn, FlexRow, HeaderText } from '@make-software/cspr-design';
import { StyledFlexColumn, StyledPageTile } from './styled';

export interface NoTipsProps {
  message?: string;
}

export const NoTips: React.FC<NoTipsProps> = ({ message }) => {
  return (
    <StyledPageTile>
      <FlexRow align={'center'} justify={'center'}>
        <StyledFlexColumn itemsSpacing={24} align={'center'} justify={'center'}>
          <FlexColumn itemsSpacing={16} align={'center'} justify={'center'}>
            <HeaderText size={3} scale={'xs'} variation={'black'}>
              {message ?? 'No tips yet'}
            </HeaderText>
          </FlexColumn>
        </StyledFlexColumn>
      </FlexRow>
    </StyledPageTile>
  );
};
