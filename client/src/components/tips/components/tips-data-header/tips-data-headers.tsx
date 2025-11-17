import styled from 'styled-components';

const StyledBodyText = styled(BodyText)(({ theme }) =>
  theme.withMedia({
    color: theme.styleguideColors.contentPrimary,
    fontSize: '13px'
  })
);

import { StyledTableDataHeader } from 'components/table/table';
import { TableRow } from 'components/table-row/table-row';
import { BodyText } from '@make-software/cspr-design';

const TipsDataHeaders = () => (
  <TableRow>
    <StyledTableDataHeader fixedWidthRem={28}>
      <StyledBodyText size={1} scale={'md'}>
        Sender
      </StyledBodyText>
    </StyledTableDataHeader>

    <StyledTableDataHeader>
      <StyledBodyText size={1} scale={'md'}>
        CSPR Amount
      </StyledBodyText>
    </StyledTableDataHeader>

    <StyledTableDataHeader fixedWidthRem={12}>
      <StyledBodyText size={1} scale={'md'}>
        Message
      </StyledBodyText>
    </StyledTableDataHeader>

    <StyledTableDataHeader fixedWidthRem={20}>
      <StyledBodyText size={1} scale={'md'}>
        Transaction Hash
      </StyledBodyText>
    </StyledTableDataHeader>
    <StyledTableDataHeader fixedWidthRem={20}>
      <BodyText size={1} scale={'xs'}>
        Time
      </BodyText>
    </StyledTableDataHeader>
  </TableRow>
);

export default TipsDataHeaders;
