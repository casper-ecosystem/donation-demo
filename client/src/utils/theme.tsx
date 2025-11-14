import { clickStyleguide, DefaultThemes, buildTheme } from '@make-software/csprclick-ui';

export const AppTheme = buildTheme({
  ...DefaultThemes.csprclick,
  appDarkTheme: {
    topBarSectionBackgroundColor:
      DefaultThemes.csprclick.csprclickDarkTheme[clickStyleguide.backgroundTopBarColor],
    [clickStyleguide.textColor]: '#DADCE5',
    bodyBackgroundColor: '#0f1429'
  },
  appLightTheme: {
    topBarSectionBackgroundColor:
      DefaultThemes.csprclick.csprclickLightTheme[clickStyleguide.backgroundTopBarColor],
    [clickStyleguide.textColor]: '#1A1919',
    bodyBackgroundColor: '#f2f3f5'
  }
});
