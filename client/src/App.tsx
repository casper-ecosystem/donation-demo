import { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useClickRef, ThemeModeType } from '@make-software/csprclick-ui';
import ClickTopBar from './components/ClickTopBar';
import { LandingBrief } from './components/GettingStarted';
import Container from './components/container';
import { Welcome } from './components/GettingStarted/components';
import { AppTheme } from './settings/theme';

const GettingStartedContainer = styled.div(({ theme }) =>
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
  const [updateViewFlag, setUpdateViewFlag] = useState<boolean>(false);

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

  const handleUpdateDonation = () => {
    setUpdateViewFlag((prevState) => !prevState);
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
        <Welcome isConnected={!!activeAccount} onUpdateDonation={handleUpdateDonation} />
        <GettingStartedContainer id={'getting-started'}>
          <LandingBrief updateViewFlag={updateViewFlag} />
        </GettingStartedContainer>
      </Container>
    </ThemeProvider>
  );
};

export default App;
