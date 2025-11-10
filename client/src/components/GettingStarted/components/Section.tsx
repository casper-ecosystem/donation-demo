import styled from 'styled-components';

export const Section = styled.div<{ border?: boolean; withBackground?: boolean; theme: any }>(
  ({ theme, border, withBackground }) =>
    theme.withMedia({
      display: 'flex',
      flexDirection: 'column',
      color: theme.contentPrimary,
      backgroundColor: withBackground ? theme.sectionBackground : 'unset',
      width: '100%',
      margin: '0 0 24px',
      padding: withBackground ? '20px' : 0,
      border: border ? `1px solid` : 'none',
      borderColor: theme.contentPrimary,
      h2: {
        margin: '0 0 16px',
        color: theme.contentPrimary,
        span: {
          fontWeight: '300',
          marginLeft: '16px'
        }
      },
      h3: {
        margin: '0 0 16px',
        color: theme.contentPrimary,
        span: {
          fontFamily: theme.typography.fontFamily.mono,
          fontWeight: '300',
          marginLeft: '16px'
        }
      },
      h5: {
        margin: '0',
        fontFamily: theme.typography.fontFamily.mono,
        color: theme.contentPrimary
      },
      p: {
        marginBottom: '10px',
        a: {
          color: 'inherit',
          textDecoration: 'none',
          fontWeight: '700'
        },
        '&:last-child': {
          marginBottom: '0'
        }
      },
      span: {
        marginBottom: '10px',
        a: {
          color: 'inherit',
          textDecoration: 'none',
          fontWeight: '700'
        },
        '&:last-child': {
          marginBottom: '0'
        }
      },
      table: {
        // marginLeft: '30px',
        // fontSize: '14px',
        // color: theme.contentPrimary
      },
      button: {
        cursor: 'pointer',
        marginTop: '24px',
        fontSize: '14px',
        width: '176px',
        height: '24px'
      },
      'button + a': {
        marginTop: '12px',
        textDecoration: 'none',
        color: theme.contentPrimary,
        '&:hover': { textDecoration: 'underline' }
      }
    })
);
