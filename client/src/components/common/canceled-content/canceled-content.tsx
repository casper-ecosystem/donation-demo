import { FlexRow } from '@make-software/cspr-design';
import { LoadingContainer, StyledTitle } from '../modal-styles';

export const CanceledContent = () => {
  return (
    <>
      <FlexRow justify={'center'}>
        <LoadingContainer itemsSpacing={54} align={'center'} justify={'center'}>
          <StyledTitle size={1} scale="lg">
            Your sign has been canceled
          </StyledTitle>
        </LoadingContainer>
      </FlexRow>
    </>
  );
};
