import { FlexRow } from '@make-software/cspr-design';
import { LoadingContainer, StyledTitle } from '../modal-styles';

export const ErrorContent = () => {
  return (
    <>
      <FlexRow justify={'center'}>
        <LoadingContainer itemsSpacing={54} align={'center'}>
          <StyledTitle size={1} scale="lg" margin={'32px 0'}>
            Something went wrong. Please try again.
          </StyledTitle>
        </LoadingContainer>
      </FlexRow>
    </>
  );
};
