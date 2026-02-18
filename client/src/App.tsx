import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useClickRef, ThemeModeType } from '@make-software/csprclick-ui';
import { AccountType } from '@make-software/csprclick-core-types';

import { AppTheme } from '@/utils';
import { ClickTopBar, Container, HeroSection, PageFooter, Section, TableTile } from '@/components';
import { TipsTable } from "@/components/tips/components";

const ContentSection = styled(Section)(({ theme }) =>
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
  const [connectedAccount, setConnectedAccount] = useState<AccountType | null>(null);
  const [refetchSignal, setRefetchSignal] = useState<number>(0);

  useEffect(() => {
    if (!clickRef) return;

    const handleSignedIn = (evt: any) => setConnectedAccount(evt.account);
    const handleSwitchedAccount = (evt: any) => setConnectedAccount(evt.account);
    const handleSignedOut = () => setConnectedAccount(null);

    clickRef.on('csprclick:signed_in', handleSignedIn);
    clickRef.on('csprclick:switched_account', handleSwitchedAccount);
    clickRef.on('csprclick:signed_out', handleSignedOut);

    return () => {
      clickRef.off('csprclick:signed_in', handleSignedIn);
      clickRef.off('csprclick:switched_account', handleSwitchedAccount);
      clickRef.off('csprclick:signed_out', handleSignedOut);
    };
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
          isConnected={!!connectedAccount}
          onUpdateTipsList={() => setRefetchSignal(Date.now())}
        />
        <ContentSection>
            <TableTile title="Previous tips">
                <TipsTable refetchSignal={refetchSignal} />
            </TableTile>
        </ContentSection>
      </Container>
      <PageFooter />
    </ThemeProvider>
  );
};

export default App;
