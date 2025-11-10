import { useState } from 'react';
import { ClickUI, Lang, ThemeModeType, useClickBadge } from '@make-software/csprclick-ui';
import {
  accountMenuItems,
  CURRENCIES,
  currencySettings,
  languageSettings,
  NETWORKS,
  networkSettings
} from './settings';
import styled from 'styled-components';
export * from './settings';

const TopBarSection = styled.section<{ theme: any }>(({ theme }) => ({
  backgroundColor: theme.topBarSectionBackgroundColor,
  position: 'fixed',
  zIndex: 1,
  width: '100%'
}));

const TopBarContainer = styled.div(({ theme }) =>
  theme.withMedia({
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    maxWidth: ['540px', '720px', '1200px'],
    margin: '0 auto',
    padding: '0 12px'
  })
);

export interface TopBarProps {
  themeMode: ThemeModeType | undefined;
  onThemeSwitch: () => void;
}

const ClickTopBar = ({ themeMode, onThemeSwitch }: TopBarProps) => {
  const [lang, setLang] = useState<Lang>(Lang.EN);
  const [currency, setCurrency] = useState(CURRENCIES[0]);
  const [network, setNetwork] = useState<string>(NETWORKS[1]);

  const { setLeftBadge } = useClickBadge();

  setLeftBadge({
    title: `📄 Go to CSPR.click docs`,
    background: 'blue',
    color: 'white',
    link: 'https://docs.cspr.click/'
  });

  return (
    <TopBarSection>
      <TopBarContainer>
        <ClickUI
          topBarSettings={{
            onThemeSwitch: onThemeSwitch,
            accountMenuItems: accountMenuItems,
            languageSettings: languageSettings(lang, setLang),
            currencySettings: currencySettings(currency, setCurrency),
            networkSettings: networkSettings(network, setNetwork)
          }}
          themeMode={themeMode}
        />
      </TopBarContainer>
    </TopBarSection>
  );
};

export default ClickTopBar;
