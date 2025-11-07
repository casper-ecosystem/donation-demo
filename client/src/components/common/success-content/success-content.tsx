import styled from 'styled-components';
import { FlexColumn, FlexRow, SubtitleText } from '@make-software/cspr-design';

const StyledFlexColumn = styled(FlexColumn)(({ theme }) =>
  theme.withMedia({
    textAlign: 'center',
    height: 'inherit'
  })
);

const LoadingContainer = styled(StyledFlexColumn)(({ theme }) =>
  theme.withMedia({
    width: '300px'
  })
);

const StyledTitle = styled(SubtitleText)(({ theme }) =>
  theme.withMedia({
    fontWeight: 700,
    color: theme.styleguideColors.contentPrimary,
    margin: '32px 0'
  })
);

export const SuccessContent = () => {
  return (
    <>
      <FlexRow justify={'center'}>
        <LoadingContainer itemsSpacing={54} align={'center'}>
          <StyledTitle size={1} scale="lg">
            You have successfully donated! Thank you!
          </StyledTitle>
        </LoadingContainer>
      </FlexRow>
    </>
  );
};
