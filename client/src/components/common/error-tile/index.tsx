import React from 'react';
import { BodyText, FlexColumn, FlexRow, HeaderText } from '@make-software/cspr-design';

import { ErrorResult } from '@/entities';

import { StyledFlexColumn } from './styled';

interface ErrorTileProps {
  error: ErrorResult;
}

export const ErrorTile: React.FC<ErrorTileProps> = ({ error }) => {
  return (
    <FlexRow align={'center'} justify={'center'}>
      <StyledFlexColumn itemsSpacing={24} align={'center'} justify={'center'}>
        <FlexColumn itemsSpacing={16} align={'center'} justify={'center'}>
          <HeaderText size={3} scale={'xs'} variation={'black'}>
            {error?.error || 'Something went wrong.'}
          </HeaderText>
          <BodyText size={3} scale={'sm'} variation={'red'}>
            {error?.details}
          </BodyText>
        </FlexColumn>
      </StyledFlexColumn>
    </FlexRow>
  );
};
