import { FlexRow } from '@make-software/cspr-design';
import { LoadingContainer, StyledTitle } from '../modal-styles';

export const SuccessContent = () => {
  return (
    <>
      <FlexRow justify={'center'}>
        <LoadingContainer itemsSpacing={54} align={'center'} justify={'center'}>
          <StyledTitle size={1} scale="lg" margin={'32px 0'}>
            You have successfully sent tips!
            <div>Thank you!</div>
          </StyledTitle>
        </LoadingContainer>
      </FlexRow>
    </>
  );
};
