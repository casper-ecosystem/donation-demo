import { useEffect, useState } from 'react';
import { Table, TableLoader } from '@make-software/cspr-design';
import { ErrorTile } from 'components/common/error-tile';
import TipsTableTile from './components/tips-table-tile/tips-table-tile';
import { LoadMoreButton } from 'components/common/load-more-button/load-more-button';
import TipsTableRow from './components/tips-table-row/tips-table-row';
import TipsDataHeaders from './components/tips-data-header/tips-data-headers';
import { useGetTips } from 'api/hooks/use-get-tips';
import { Tip } from 'api/tips-requests';
import NoTips from "components//common/no-tips/no-tips";

interface TipsListProps {
    shouldRefetch: boolean;
}

const TipsTable = ({ shouldRefetch }: TipsListProps) => {
  const { loading, error, data, refetch } = useGetTips();

  useEffect(() => {
      if(shouldRefetch) {
          refetch();
      }
  }, [shouldRefetch]);

  if (loading) {
    return <TableLoader columnsLength={1} />;
  }

  if (error) {
    return <ErrorTile message={error.details || error.error} />;
  }

  if (!data || !data.items || data.items?.length < 1) {
    return <NoTips />;
  }

  return (
    <Table
      renderHeader={() => <TipsDataHeaders itemCounter={data.items?.length} />}
      renderData={() => data.items?.map((t: Tip) => <TipsTableRow tip={t} key={t.id} />)}
      renderFooter={() =>
        data.items?.length >= 5 ? (
          <LoadMoreButton
            isCollapsed={data.items?.length < data?.total}
            handleLoadMore={() => refetch('-1')}
            handleReset={() => refetch()}
          />
        ) : (
          <></>
        )
      }
    />
  );
};

const TipsList = ({ shouldRefetch }: TipsListProps) => {
  return (
    <TipsTableTile title={''}>
      <TipsTable shouldRefetch={shouldRefetch} />
    </TipsTableTile>
  );
};

export default TipsList;
