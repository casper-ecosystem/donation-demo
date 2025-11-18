import { TableDataHeader, TableRow } from '@make-software/cspr-design';

export const TipsDataHeaders = () => (
  <TableRow>
    <TableDataHeader>Sender</TableDataHeader>
    <TableDataHeader>CSPR Amount</TableDataHeader>
    <TableDataHeader>Message</TableDataHeader>
    <TableDataHeader>Transaction Hash</TableDataHeader>
    <TableDataHeader>Time</TableDataHeader>
  </TableRow>
);
