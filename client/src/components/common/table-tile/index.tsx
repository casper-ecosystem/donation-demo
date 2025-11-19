import React from 'react';

import { FlexColumn, PageTile } from '@make-software/cspr-design';

import { TitleText } from './styled';

interface TableTileProps {
  title: string;
  children: React.ReactNode;
}

export const TableTile: React.FC<TableTileProps> = ({ title, children }) => {
  return (
    <FlexColumn itemsSpacing={24}>
      <TitleText size={4} scale={'sm'}>
        {title}
      </TitleText>
      <PageTile>{children}</PageTile>
    </FlexColumn>
  );
};
