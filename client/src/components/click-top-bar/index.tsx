import React from 'react';
import { ClickUI, ThemeModeType, useClickBadge } from '@make-software/csprclick-ui';

import { accountMenuItems } from './settings/account-menu';
import { TopBarContainer, TopBarSection } from './styled';

export interface TopBarProps {
  themeMode: ThemeModeType | undefined;
  onThemeSwitch: () => void;
}

export const ClickTopBar: React.FC<TopBarProps> = ({ themeMode, onThemeSwitch }) => {
  const { setLeftBadge } = useClickBadge();

  setLeftBadge({
    title: `{} Check the source code`,
    background: 'blue',
    color: 'white',
    link: 'https://github.com/casper-ecosystem/donation-demo'
  });

  return (
    <TopBarSection>
      <TopBarContainer>
        <ClickUI
          topBarSettings={{
            onThemeSwitch: onThemeSwitch,
            accountMenuItems: accountMenuItems
          }}
          themeMode={themeMode}
        />
      </TopBarContainer>
    </TopBarSection>
  );
};
