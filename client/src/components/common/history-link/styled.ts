import styled from 'styled-components';

export const StyledWrapper = styled.span(({ theme }) => ({
  color: theme.styleguideColors.contentBlue,
  '& > *': {
    color: theme.styleguideColors.contentBlue
  },
  '&:hover > *': {
    color: theme.styleguideColors.fillPrimaryRed
  },
  '&:active > *': {
    color: theme.styleguideColors.fillPrimaryRedClick
  }
}));
