import { FlexRow } from '@make-software/cspr-design';
import LoadingIcon from '../../../assets/icons/loading.svg';
import { LoadingContainer, LoadingSvgIcon, StyledTitle } from '../modal-styles';

export const LoadingContent = () => {
  return (
    <>
      <FlexRow justify={'center'} align={'center'}>
        <LoadingContainer itemsSpacing={54} align={'center'} justify={'center'}>
          <LoadingSvgIcon src={LoadingIcon} width={100} height={100} />
          <StyledTitle size={1} scale="lg" margin={'0 0 32px 0'}>
            Sending tips...
          </StyledTitle>
        </LoadingContainer>
      </FlexRow>
    </>
  );
};
