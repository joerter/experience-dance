import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#E2481C',
    },
    secondary: {
      main: '#000000',
    },
    background: {
      default: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 800,
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
        },
      },
    },
  },
});

export default theme;
