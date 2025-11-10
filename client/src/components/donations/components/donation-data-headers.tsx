import { BodyText, FlexRow, TableDataHeaderProps, TableRow } from '@make-software/cspr-design';
import styled from 'styled-components';

interface DonationDataHeadersProps {
  itemCounter: number;
}
const StyledTableDataHeader = styled.th<TableDataHeaderProps>(
  ({ theme, align = 'left', fixedWidthRem }) => ({
    textAlign: align,
    height: 20,
    padding: 8,
    ':first-of-type': {
      paddingLeft: 20
    },
    ':last-of-type': {
      paddingRight: 20
    },
    ...(fixedWidthRem && {
      width: `${fixedWidthRem}rem`
    }),
    textTransform: 'capitalize'
  })
);

const StyledTableRow = styled(TableRow)(({ theme }) =>
  theme.withMedia({
    backgroundColor: theme.styleguideColors.fillSecondary
  })
);

const StyledBodyText = styled(BodyText)(({ theme }) =>
  theme.withMedia({
    color: theme.styleguideColors.contentPrimary,
    fontSize: '13px'
  })
);

const PaginationContainer = styled(FlexRow)(({ theme }) =>
  theme.withMedia({
    height: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '12px 20px',
    margin: 0
  })
);

const DonationDataHeaders = ({ itemCounter }: DonationDataHeadersProps) => (
  <>
    <PaginationContainer>
      <BodyText size={3} variation="darkGray">
        {itemCounter || 0} {'donation'}
        {(itemCounter || 0) > 1 ? 's' : ''}
      </BodyText>
    </PaginationContainer>
    <StyledTableRow>
      <StyledTableDataHeader fixedWidthRem={12}>
        <StyledBodyText size={1} scale={'md'}>
          CSPR Amount
        </StyledBodyText>
      </StyledTableDataHeader>

      <StyledTableDataHeader fixedWidthRem={20}>
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
    </StyledTableRow>
  </>
);

export default DonationDataHeaders;
