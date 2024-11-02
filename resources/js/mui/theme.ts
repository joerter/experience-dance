import { createTheme } from '@mui/material/styles';

const orange = '#E2481C';
const black = '#000000';
const white = '#FFFFFF';
const gray1 = '#CBCBCB';
const gray2 = '#2D2D2D';
const gray3 = '#ECF0F1';

declare module '@mui/material/styles' {
  interface Palette {
    gray1: Palette['primary'];
    gray2: Palette['primary'];
    gray3: Palette['primary'];
  }
  interface PaletteOptions {
    gray1?: PaletteOptions['primary'];
    gray2?: PaletteOptions['primary'];
    gray3?: PaletteOptions['primary'];
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: orange,
    },
    secondary: {
      main: black,
    },
    background: {
      default: black,
    },
    gray1: {
      main: gray1,
    },
    gray2: {
      main: gray2,
    },
    gray3: {
      main: gray3,
    },
    text: {
      primary: white,
      secondary: black,
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
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
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
          padding: '0.25rem 2.25rem',
          color: gray1,
          variants: [
            {
              props: { variant: 'contained' },
              style: {
                fontWeight: 600,
              },
            },
            {
              props: { variant: 'outlined' },
              style: {
                border: `1px solid ${gray2}`,
                '&:hover': {
                  border: `1px solid ${gray2}`,
                  backgroundColor: orange,
                },
                color: gray1,
              },
            },
          ],
        },
      },
    },
  },
});

export default theme;
