import styled from 'styled-components';
import { FlexColumn, FlexRow, SubtitleText, SvgIcon } from '@make-software/cspr-design';
import LoadingIcon from '../../../assets/icons/loading.svg';

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

const LoadingSvgIcon = styled(SvgIcon)(() => ({
  animationName: 'spin',
  animationDuration: '5000ms',
  animationIterationCount: 'infinite',
  animationTimingFunction: 'linear'
}));

const StyledTitle = styled(SubtitleText)(({ theme }) =>
  theme.withMedia({
    fontWeight: 700,
    color: theme.styleguideColors.contentPrimary,
    marginBottom: '32px'
  })
);

export const LoadingContent = () => {
  return (
    <>
      <FlexRow justify={'center'}>
        <LoadingContainer itemsSpacing={54} align={'center'}>
          <LoadingSvgIcon src={LoadingIcon} width={100} height={100} />
          <StyledTitle size={1} scale="lg">
            Donation processing...
          </StyledTitle>
        </LoadingContainer>
      </FlexRow>
    </>
  );
};
