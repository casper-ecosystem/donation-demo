import styled from 'styled-components';
import { BodyText, FlexColumn, FlexRow, HeaderText, PageTile } from '@make-software/cspr-design';

const StyledPageTile = styled(PageTile)(() => ({
  padding: '60px 0',
  boxShadow: 'none'
}));

const StyledFlexColumn = styled(FlexColumn)(() => ({
  width: '400px'
}));

const StyledBodyText = styled(BodyText)(({ theme }) => ({
  textAlign: 'center'
}));

const NoDonations = () => {
  return (
    <StyledPageTile>
      <FlexRow align={'center'} justify={'center'}>
        <StyledFlexColumn itemsSpacing={24} align={'center'} justify={'center'}>
          <FlexColumn itemsSpacing={16} align={'center'} justify={'center'}>
            <HeaderText size={3} scale={'xs'} variation={'black'}>
              No donations yet
            </HeaderText>
            {/*<StyledBodyText*/}
            {/*    size={3}*/}
            {/*    scale={'sm'}*/}
            {/*    variation={'darkGray'}*/}
            {/*>*/}
            {/*    you can donate*/}
            {/*</StyledBodyText>*/}
          </FlexColumn>
          {/*<Button color={'primaryBlue'} onClick={handlePlay}>*/}
          {/*    Play*/}
          {/*</Button>*/}
        </StyledFlexColumn>
      </FlexRow>
    </StyledPageTile>
  );
};

export default NoDonations;
