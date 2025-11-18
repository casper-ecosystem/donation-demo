import { useEffect } from 'react';
import { TableTile } from 'components/table-tile/table-tile';
import { Table, TableLoader } from '@make-software/cspr-design';
import { ErrorTile } from 'components/common/error-tile';
import { LoadMoreButton } from 'components/common/load-more-button/load-more-button';
import TipsTableRow from './components/tips-table-row/tips-table-row';
import { TipsDataHeaders } from './components/tips-data-header/tips-data-headers';
import { useGetTips } from 'api/hooks/use-get-tips';
import { Tip } from 'api/tips-requests';
import NoTips from 'components/common/no-tips/no-tips';

interface TipsListProps {
  refetchSignal: number;
}

const TipsTable = ({ refetchSignal }: TipsListProps) => {
  const { loading, error, data, refetch } = useGetTips('5');

  useEffect(() => {
    refetchSignal > 0 && refetch();
  }, [refetchSignal]);

  if (loading) {
    return <TableLoader columnsLength={1} />;
  }

  if (error) {
    return <ErrorTile error={error} />;
  }

  if (!data || !data.items || data.items?.length < 1) {
    return <NoTips />;
  }

  return (
    <Table
      renderDataHeaders={() => <TipsDataHeaders />}
      renderData={() => data.items?.map((t: Tip) => <TipsTableRow tip={t} key={t.id} />)}
      renderFooter={() =>
        data?.total > 5 && (
          <LoadMoreButton
            isCollapsed={data.items.length < data?.total}
            handleLoadMore={() => refetch()}
            handleReset={() => refetch('5')}
          />
        )
      }
    />
  );
};

const TipsList = ({ refetchSignal }: TipsListProps) => {
  return (
    <TableTile title={''}>
      <TipsTable refetchSignal={refetchSignal} />
    </TableTile>
  );
};

export default TipsList;
