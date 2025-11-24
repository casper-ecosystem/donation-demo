import styled from 'styled-components';
import { BodyText } from '@make-software/cspr-design';

export const StyledAccountInfoText = styled(BodyText)(({ theme }) => ({
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
