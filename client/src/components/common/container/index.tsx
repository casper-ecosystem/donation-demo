import styled from 'styled-components';

export const Container = styled.div<{ theme: any }>(({ theme }) =>
  theme.withMedia({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    minHeight: '100vh',
    margin: '0 auto',
    backgroundColor: theme.bodyBackgroundColor,
    color: theme.contentSecondary,
    h2: { fontSize: 'calc(12px + 2vmin)', fontWeight: '700', color: theme.contentPrimary },
    h3: {
      fontSize: 'calc(11px + 2vmin)',
      fontWeight: '500',
      color: theme.contentPrimary,
      marginTop: '100px'
    },
    h5: {
      fontSize: 'calc(10px + 2vmin)',
      fontWeight: '500',
      color: theme.contentPrimary,
      textAlign: 'center'
    },
    a: {
      color: theme.contentPrimary,
      cursor: 'pointer',
      textDecoration: 'none'
    },
    b: {
      cursor: 'pointer'
    },

    pre: {
      background: theme.backgroundPrimary,
      code: {
        color: theme.codeColor
      }
    },
    ol: {
      color: theme.contentPrimary,
      li: {
        marginTop: '5px',
        a: {
          '&:hover': {
            color: '#294ACC'
          }
        }
      }
    },
    ul: {
      li: {
        marginTop: '5px'
      }
    }
  })
);
