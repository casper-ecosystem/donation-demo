import styled from 'styled-components';
import { FlexRow } from '@make-software/cspr-design';

export const ButtonContainer = styled(FlexRow)(({ theme }) =>
  theme.withMedia({
    padding: '20px',
    position: 'relative',
    ':after': {
      content: "''",
      position: 'absolute',
      left: 20,
      right: 20,
      top: 0,
      borderTop: theme.border.tableRowSeparator
    }
  })
);
