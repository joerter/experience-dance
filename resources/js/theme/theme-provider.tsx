import type { Theme } from '@mui/material/styles';
import type { ThemeProviderProps as MuiThemeProviderProps } from '@mui/material/styles/ThemeProvider';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as ThemeVarsProvider } from '@mui/material/styles';

import { createTheme } from './create-theme';

import type { } from './extend-theme-types';
import type { ThemeOptions } from './types';

// ----------------------------------------------------------------------

export type ThemeProviderProps = Omit<MuiThemeProviderProps, 'theme'> & {
  theme?: Theme;
  themeOverrides?: ThemeOptions;
};

export function ThemeProvider({
  themeOverrides,
  children,
  ...other
}: ThemeProviderProps) {
  const theme = createTheme({
    settingsState: undefined,
    localeComponents: undefined,
    themeOverrides,
  });

  console.log('final theme', theme);

  return (
    <ThemeVarsProvider disableTransitionOnChange theme={theme} {...other}>
      <CssBaseline />
      {children}
    </ThemeVarsProvider>
  );
}
