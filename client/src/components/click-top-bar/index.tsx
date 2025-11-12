import { ClickUI, ThemeModeType, useClickBadge } from '@make-software/csprclick-ui';
import { accountMenuItems } from './settings';
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
            accountMenuItems: accountMenuItems
          }}
          themeMode={themeMode}
        />
      </TopBarContainer>
    </TopBarSection>
  );
};

export default ClickTopBar;
