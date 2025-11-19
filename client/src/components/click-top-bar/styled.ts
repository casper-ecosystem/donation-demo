import styled from 'styled-components';

export const TopBarSection = styled.section<{ theme: any }>(({ theme }) => ({
  backgroundColor: theme.topBarSectionBackgroundColor,
  position: 'fixed',
  zIndex: 1,
  width: '100%'
}));

export const TopBarContainer = styled.div(({ theme }) =>
  theme.withMedia({
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    maxWidth: ['540px', '720px', '1200px'],
    margin: '0 auto',
    padding: '0 12px'
  })
);
