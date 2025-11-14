import { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useClickRef, ThemeModeType } from '@make-software/csprclick-ui';
import ClickTopBar from './components/click-top-bar';
import Container from './components/common/container/container';
import { Welcome } from './components/home/components';
import { AppTheme } from './settings/theme';
import { TipsContainer } from './components/home';
import { PageFooter } from './components/layout/page-footer';

const HomeContainer = styled.div(({ theme }) =>
  theme.withMedia({
    maxWidth: ['100%', '720px', '1200px'],
    width: '100%',
    padding: '0 12px',
    margin: '0 auto'
  })
);

const App = () => {
  const clickRef = useClickRef();
  const [themeMode, setThemeMode] = useState<ThemeModeType>(ThemeModeType.light);
  const [activeAccount, setActiveAccount] = useState<any>(null);
  const [refetchSignal, setRefetchSignal] = useState<number>(0);

  useEffect(() => {
    clickRef?.on('csprclick:signed_in', async (evt: any) => {
      await setActiveAccount(evt.account);
    });
    clickRef?.on('csprclick:switched_account', async (evt: any) => {
      await setActiveAccount(evt.account);
    });
    clickRef?.on('csprclick:signed_out', async (evt: any) => {
      setActiveAccount(null);
    });
    clickRef?.on('csprclick:disconnected', async (evt: any) => {
      setActiveAccount(null);
    });
  }, [clickRef?.on]);

  const handleUpdateTips = () => {
    setRefetchSignal(Date.now());
  };

  return (
    <ThemeProvider theme={AppTheme[themeMode]}>
      <ClickTopBar
        themeMode={themeMode}
        onThemeSwitch={() =>
          setThemeMode(themeMode === ThemeModeType.light ? ThemeModeType.dark : ThemeModeType.light)
        }
      />
      <Container>
        <Welcome isConnected={!!activeAccount} onUpdateTipsList={handleUpdateTips} />
        <HomeContainer id={'getting-started'}>
          <TipsContainer refetchSignal={refetchSignal} />
        </HomeContainer>
      </Container>
      <PageFooter />
    </ThemeProvider>
  );
};

export default App;
