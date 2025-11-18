import React from 'react';
import { TableRow, TableData, Table } from '@make-software/cspr-design';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type Props = {
  columnsLength: number;
  rowsLength?: number;
};

export const LoadingSkeleton = ({ columnsLength, rowsLength = 10 }: Props) => {
  const tableData = Array(rowsLength).fill(undefined);
  const columnsRow = Array(columnsLength).fill(null);

  return (
    <Table
      renderData={() =>
        tableData.map((item, index) => (
          <TableRow key={'row' + index} loading>
            {columnsRow.map((item2, index2) => (
              <TableData key={'column' + index2}>
                <Skeleton />
              </TableData>
            ))}
          </TableRow>
        ))
      }
    />
  );
};
