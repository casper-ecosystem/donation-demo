import styled from 'styled-components';
import { BodyText, FlexColumn, FlexRow, HeaderText } from '@make-software/cspr-design';
import { ErrorResult } from '../../api/tips-requests';

const StyledFlexColumn = styled(FlexColumn)(() => ({
  width: '400px',
  height: '400px'
}));

interface ErrorTileProps {
  error: ErrorResult;
}

export const ErrorTile = ({ error }: ErrorTileProps) => {
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
