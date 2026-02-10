import styled from 'styled-components';
import mobileBgImage from '@/assets/backgrounds/bg-mobile-full.jpg';
import desktopBgImage from '@/assets/backgrounds/bg-desktop-full.jpg';
import { Button } from "@make-software/cspr-design";

const breakpoints = {
    sm: '768px',
    md: '1024px'
};

export const Container = styled.section(({ theme }) =>
  theme.withMedia({
    backgroundImage: [
      `url("${mobileBgImage}")`,
      `url("${desktopBgImage}")`,
      `url("${desktopBgImage}")`
    ],
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'right',
    height: ['393px', '424px', '424px'],
    width: '100%'
  })
);

export const Content = styled.div`
    position: relative;
    top: 120px;

    max-width: 540px;
    padding: 0 12px;
    margin: 0 auto;

    @media (min-width: ${breakpoints.sm}) {
        max-width: 720px;
        top: 174px;
    }

    @media (min-width: ${breakpoints.md}) {
        max-width: 960px;
    }
`;

export const GreetingText = styled.div(({ theme }) =>
  theme.withMedia({
    color: '#DADCE5',
    fontSize: ['24px', '40px', '40px'],
    fontWeight: '600',
    lineHeight: ['32px', '56px', '56px'],
    marginTop: ['24px', '40px', '40px']
  })
);

export const KillerAppText = styled.div(({ theme }) =>
  theme.withMedia({
    color: '#A8ADBF',
    fontSize: '16px',
    fontWeight: '200',
    lineHeight: '24px',
    marginTop: '8px',
    width: ['81%', '100%', '100%']
  })
);

export const SendTipButton = styled(Button)(({ theme }) =>
  theme.withMedia({
    width: '176px',
    height: '36px',
    backgroundColor: '#B2332D',
    fontSize: '14px',
    lineHeight: '20px',
    color: '#F2F2F2',
    marginTop: '32px',

    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#9f211c'
    }
  })
);
