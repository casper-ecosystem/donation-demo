import styled from 'styled-components';
import { FlexColumn, FlexRow, HeaderText, PageTile } from '@make-software/cspr-design';

const StyledPageTile = styled(PageTile)(() => ({
  padding: '60px 0',
  boxShadow: 'none'
}));

const StyledFlexColumn = styled(FlexColumn)(() => ({
  width: '400px'
}));

export interface NoTipsProps {
  message?: string;
}

const NoTips = ({ message }: NoTipsProps) => {
  return (
    <StyledPageTile>
      <FlexRow align={'center'} justify={'center'}>
        <StyledFlexColumn itemsSpacing={24} align={'center'} justify={'center'}>
          <FlexColumn itemsSpacing={16} align={'center'} justify={'center'}>
            <HeaderText size={3} scale={'xs'} variation={'black'}>
              {message ?? 'No tips yet'}
            </HeaderText>
          </FlexColumn>
        </StyledFlexColumn>
      </FlexRow>
    </StyledPageTile>
  );
};

export default NoTips;
