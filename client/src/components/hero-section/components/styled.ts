import styled from 'styled-components';
import { Button, Textarea } from '@make-software/cspr-design';

export const StyledButton = styled(Button)(({ theme }) =>
  theme.withMedia({
    cursor: 'pointer'
  })
);

export const StyledTextArea = styled(Textarea)(({ theme }) =>
  theme.withMedia({
    width: '100%'
  })
);
