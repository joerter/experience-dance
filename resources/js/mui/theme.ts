import { createTheme } from '@mui/material/styles';

// Color palette
const orange = '#E2481C';
const black = '#000000';
const white = '#FFFFFF';
const gray1 = '#CBCBCB';
const gray2 = '#2D2D2D';
const gray3 = '#ECF0F1';
const gray4 = '#525252';

// Custom spacing units
const spacing = {
  xs: '0.25rem', // 4px
  sm: '0.5rem', // 8px
  md: '1rem', // 16px
  lg: '1.5rem', // 24px
  xl: '2rem', // 32px
  xxl: '3rem', // 48px
};

// Extend the theme to include custom color properties
declare module '@mui/material/styles' {
  interface Palette {
    gray1: Palette['primary'];
    gray2: Palette['primary'];
    gray3: Palette['primary'];
    gray4: Palette['primary'];
  }
  interface PaletteOptions {
    gray1?: PaletteOptions['primary'];
    gray2?: PaletteOptions['primary'];
    gray3?: PaletteOptions['primary'];
    gray4?: PaletteOptions['primary'];
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: orange,
      light: '#ff6942', // Lighter shade of orange
      dark: '#b13816', // Darker shade of orange
    },
    secondary: {
      main: black,
      light: gray4,
      dark: gray2,
    },
    background: {
      default: white,
      paper: gray3,
    },
    gray1: {
      main: gray1,
      light: '#e0e0e0',
      dark: '#b1b1b1',
    },
    gray2: {
      main: gray2,
      light: '#3d3d3d',
      dark: '#1d1d1d',
    },
    gray3: {
      main: gray3,
      light: '#f5f7f8',
      dark: '#d3d7d8',
    },
    gray4: {
      main: gray4,
      light: '#6a6a6a',
      dark: '#3b3b3b',
    },
    text: {
      primary: black,
      secondary: gray4,
    },
    error: {
      main: '#d32f2f',
      light: '#ef5350',
      dark: '#c62828',
    },
    success: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
    },
  },
  typography: {
    fontFamily:
      '"Plus Jakarta Sans", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
      lineHeight: 1.2,
      marginBottom: spacing.lg,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.3,
      marginBottom: spacing.md,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.3,
      marginBottom: spacing.md,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '30px',
          padding: `${spacing.xs} ${spacing.xl}`,
          transition: 'all 0.2s ease-in-out',
        },
        contained: {
          fontWeight: 600,
          color: white,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
            transform: 'translateY(-1px)',
          },
        },
        outlined: {
          borderWidth: '1.5px',
          '&:hover': {
            borderWidth: '1.5px',
          },
        },
        text: {
          padding: `${spacing.xs} ${spacing.md}`,
          '&:hover': {
            backgroundColor: 'rgba(226, 72, 28, 0.04)',
          },
        },
        sizeLarge: {
          padding: `${spacing.sm} ${spacing.xxl}`,
        },
        sizeSmall: {
          padding: `${spacing.xs} ${spacing.lg}`,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            '& fieldset': {
              borderColor: gray1,
            },
            '&:hover fieldset': {
              borderColor: gray4,
            },
            '&.Mui-focused fieldset': {
              borderColor: orange,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          fontWeight: 500,
        },
        filled: {
          backgroundColor: gray3,
          '&:hover': {
            backgroundColor: gray1,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
        },
        elevation2: {
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
        },
      },
    },
  },
});

export default theme;
