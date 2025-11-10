import { FlexColumn, HeaderText, PageTile } from '@make-software/cspr-design';

interface TableTileProps {
  title: string;
  children: React.ReactNode;
}

export const TableTile = ({ title, children }: TableTileProps) => {
  return (
    <FlexColumn itemsSpacing={24}>
      <HeaderText size={4} scale={'sm'}>
        {title}
      </HeaderText>
      <PageTile>{children}</PageTile>
    </FlexColumn>
  );
};

export default TableTile;
