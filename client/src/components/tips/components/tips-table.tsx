import React, { useEffect } from 'react';
import { Table, TableLoader } from '@make-software/cspr-design';

import { useGetTips } from '@/hooks';
import { ErrorTile, LoadMoreButton, NoTips } from '@/components';

import { TipsDataHeaders } from './tips-data-headers';
import { TipsTableRow } from './tips-table-row';

export interface TipsListProps {
  refetchSignal: number;
}

export const TipsTable: React.FC<TipsListProps> = ({ refetchSignal }) => {
  const { loading, error, data, refetch } = useGetTips('5');

  useEffect(() => {
    if (refetchSignal > 0) {
      refetch();
    }
  }, [refetchSignal, refetch]);

  if (loading) {
    return <TableLoader columnsLength={1} />;
  }

  if (error) {
    return <ErrorTile error={error} />;
  }

  if (!data || !data.items || data.items.length < 1) {
    return <NoTips />;
  }

  const isCollapsed = data.items.length < (data.total ?? 0);

  return (
    <Table
      renderDataHeaders={() => <TipsDataHeaders />}
      renderData={() => data?.items?.map((t) => <TipsTableRow tip={t} key={t.id} />)}
      renderFooter={() =>
        (data.total ?? 0) > 5 && (
          <LoadMoreButton
            isCollapsed={isCollapsed}
            handleLoadMore={() => refetch()} // fetch all (no limit)
            handleReset={() => refetch('5')} // back to first 5
          />
        )
      }
    />
  );
};
