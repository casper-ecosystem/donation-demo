import { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useClickRef, ThemeModeType } from '@make-software/csprclick-ui';
import { AccountType } from '@make-software/csprclick-core-types';

import { AppTheme } from '@/utils';
import { ClickTopBar, Container, HeroSection, PageFooter, TipsContainer } from '@/components';

const MainSection = styled.section(({ theme }) =>
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
  const [activeAccount, setActiveAccount] = useState<AccountType | null>(null);
  const [refetchSignal, setRefetchSignal] = useState<number>(0);

  useEffect(() => {
    clickRef?.on('csprclick:signed_in', (evt: any) => setActiveAccount(evt.account));
    clickRef?.on('csprclick:switched_account', (evt: any) => setActiveAccount(evt.account));
    clickRef?.on('csprclick:signed_out', () => setActiveAccount(null));
    clickRef?.on('csprclick:switched_account', () => setActiveAccount(null));
  }, [clickRef?.on]);

  return (
    <ThemeProvider theme={AppTheme[themeMode]}>
      <ClickTopBar
        themeMode={themeMode}
        onThemeSwitch={() =>
          setThemeMode(themeMode === ThemeModeType.light ? ThemeModeType.dark : ThemeModeType.light)
        }
      />
      <Container>
        <HeroSection
          isConnected={!!activeAccount}
          onUpdateTipsList={() => setRefetchSignal(Date.now())}
        />
        <MainSection>
          <TipsContainer refetchSignal={refetchSignal} />
        </MainSection>
      </Container>
      <PageFooter />
    </ThemeProvider>
  );
};

export default App;
