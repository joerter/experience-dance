import type { CommonColors } from '@mui/material/styles/createPalette';

import type { PaletteColorNoChannels } from './core/palette';
import type {
  ThemeColorScheme,
  ThemeCssVariables,
  ThemeDirection,
} from './types';

// ----------------------------------------------------------------------

type ThemeConfig = {
  classesPrefix: string;
  modeStorageKey: string;
  direction: ThemeDirection;
  defaultMode: ThemeColorScheme;
  cssVariables: ThemeCssVariables;
  fontFamily: Record<'primary' | 'secondary', string>;
  palette: Record<
    'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error',
    PaletteColorNoChannels
  > & {
    common: Pick<CommonColors, 'black' | 'white'>;
    grey: Record<
      | '50'
      | '100'
      | '200'
      | '300'
      | '400'
      | '500'
      | '600'
      | '700'
      | '800'
      | '900',
      string
    >;
  };
};

export const themeConfig: ThemeConfig = {
  /** **************************************
   * Base
   *************************************** */
  direction: 'ltr',
  defaultMode: 'light',
  modeStorageKey: 'theme-mode',
  classesPrefix: 'minimal',
  /** **************************************
   * Typography
   *************************************** */
  fontFamily: {
    primary: 'Public Sans Variable',
    secondary: 'Barlow',
  },
  /** **************************************
   * Palette
   *************************************** */
  palette: {
    primary: {
      lighter: '#FFE2D9',
      light: '#FF8A6B',
      main: '#E2481C',
      dark: '#B93815',
      darker: '#8C2A10',
      contrastText: '#FFFFFF',
    },
    secondary: {
      lighter: '#D9F2F0',
      light: '#66B8B2',
      main: '#067D74',
      dark: '#05635C',
      darker: '#034541',
      contrastText: '#FFFFFF',
    },
    info: {
      lighter: '#D9F2FF',
      light: '#66C7FF',
      main: '#0091E6',
      dark: '#006DAD',
      darker: '#004B75',
      contrastText: '#FFFFFF',
    },
    success: {
      lighter: '#E6FFE8',
      light: '#70E679',
      main: '#2CB537',
      dark: '#1F8828',
      darker: '#155C1B',
      contrastText: '#FFFFFF',
    },
    warning: {
      lighter: '#FFF3D9',
      light: '#FFCC66',
      main: '#FFA500',
      dark: '#CC7700',
      darker: '#8C5100',
      contrastText: '#1C252E',
    },
    error: {
      lighter: '#FFE5D9',
      light: '#FF8566',
      main: '#FF3019',
      dark: '#CC2715',
      darker: '#8C1B0E',
      contrastText: '#FFFFFF',
    },
    // primary: {
    //   lighter: '#C8FAD6',
    //   light: '#5BE49B',
    //   main: '#00A76F',
    //   dark: '#007867',
    //   darker: '#004B50',
    //   contrastText: '#FFFFFF',
    // },
    // secondary: {
    //   lighter: '#EFD6FF',
    //   light: '#C684FF',
    //   main: '#8E33FF',
    //   dark: '#5119B7',
    //   darker: '#27097A',
    //   contrastText: '#FFFFFF',
    // },
    // info: {
    //   lighter: '#CAFDF5',
    //   light: '#61F3F3',
    //   main: '#00B8D9',
    //   dark: '#006C9C',
    //   darker: '#003768',
    //   contrastText: '#FFFFFF',
    // },
    // success: {
    //   lighter: '#D3FCD2',
    //   light: '#77ED8B',
    //   main: '#22C55E',
    //   dark: '#118D57',
    //   darker: '#065E49',
    //   contrastText: '#ffffff',
    // },
    // warning: {
    //   lighter: '#FFF5CC',
    //   light: '#FFD666',
    //   main: '#FFAB00',
    //   dark: '#B76E00',
    //   darker: '#7A4100',
    //   contrastText: '#1C252E',
    // },
    // error: {
    //   lighter: '#FFE9D5',
    //   light: '#FFAC82',
    //   main: '#FF5630',
    //   dark: '#B71D18',
    //   darker: '#7A0916',
    //   contrastText: '#FFFFFF',
    // },
    grey: {
      '50': '#FCFDFD',
      '100': '#F9FAFB',
      '200': '#F4F6F8',
      '300': '#DFE3E8',
      '400': '#C4CDD5',
      '500': '#919EAB',
      '600': '#637381',
      '700': '#454F5B',
      '800': '#1C252E',
      '900': '#141A21',
    },
    common: { black: '#000000', white: '#FFFFFF' },
  },
  /** **************************************
   * Css variables
   *************************************** */
  cssVariables: {
    cssVarPrefix: '',
    colorSchemeSelector: 'data-color-scheme',
  },
};
