import styled from 'styled-components';
import { FlexColumn, PageTile } from '@make-software/cspr-design';

export const StyledPageTile = styled(PageTile)(() => ({
  padding: '60px 0',
  boxShadow: 'none'
}));

export const StyledFlexColumn = styled(FlexColumn)(() => ({
  width: '400px'
}));
