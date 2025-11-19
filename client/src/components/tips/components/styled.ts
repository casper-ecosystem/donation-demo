import styled from 'styled-components';
import { BodyText } from '@make-software/cspr-design';

export const StyledMessageText = styled.div(({ theme }) =>
  theme.withMedia({
    width: '300px',
    maxWidth: '300px',
    color: theme.styleguideColors.contentPrimary
  })
);

export const StyledTimeText = styled(BodyText)(({ theme }) =>
  theme.withMedia({
    color: theme.styleguideColors.contentPrimary
  })
);
