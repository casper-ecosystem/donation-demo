import { useEffect } from 'react';
import { Table, TableLoader } from '@make-software/cspr-design';
import { ErrorTile } from '../common/error-tile';
import NoDonations from '../common/no-donations/no-donations';
import TableTile from './components/table-tile/table-tile';
import { LoadMoreButton } from '../common/load-more-button/load-more-button';
import DonationTableRow from './components/donation-table-row';
import DonationDataHeaders from './components/donation-data-headers';
import { useGetDonations } from '../../api/hooks/useGetDonations';
import { Donation } from '../../api/donation-requests';

interface DonationListProps {
  updateViewFlag: boolean;
}

const DonationTable = ({ updateViewFlag }: DonationListProps) => {
  const { loading, error, data, refetch } = useGetDonations();

  useEffect(() => {
    refetch();
  }, [updateViewFlag]);

  if (loading) {
    return <TableLoader columnsLength={1} />;
  }

  if (error) {
    return <ErrorTile message={error.message} />;
  }

  if (!data || !data.items || data.items?.length < 1) {
    return <NoDonations />;
  }

  return (
    <Table
      renderHeader={() => <DonationDataHeaders itemCounter={data.items?.length} />}
      renderData={() =>
        data.items?.map((d: Donation) => <DonationTableRow donation={d} key={d.id} />)
      }
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

const DonationsList = ({ updateViewFlag }: DonationListProps) => {
  return (
    <TableTile title={''}>
      <DonationTable updateViewFlag={updateViewFlag} />
    </TableTile>
  );
};

export default DonationsList;
