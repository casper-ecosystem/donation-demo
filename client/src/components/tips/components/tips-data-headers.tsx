import { TableDataHeader, TableRow } from '@make-software/cspr-design';

export const TipsDataHeaders = () => (
  <TableRow>
    <TableDataHeader>Sender</TableDataHeader>
    <TableDataHeader>Amount</TableDataHeader>
    <TableDataHeader>Message</TableDataHeader>
    <TableDataHeader>Transaction Hash</TableDataHeader>
    <TableDataHeader align="right" fixedWidthRem={6.25}>
      Age
    </TableDataHeader>
  </TableRow>
);
