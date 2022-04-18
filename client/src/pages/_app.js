import '../styles/globals.css';

import Toolbar from '@mui/material/Toolbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import Head from 'next/head';
import ScrollTop from '../components/ScrollToTop';
import Collapse from '@mui/material/Collapse';


const theme = createTheme({
  palette: {
    primary: {
      main: '#449788',
    },
    text: {
      main: '#828282',
      darker: '#000000',
      contrastText: '#fff',
    },

    secondary: {
      main: '#FFFBFB',
    },
    shader: {
      main: '#93CBC1',
      dark: '#93CBd8',
    },
    error: {
      main: '#EA4134',
      dark: '#CC2E2E',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

function MyApp(props) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Qedb</title>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin />
        <link
          href='https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&display=swap'
          rel='stylesheet'
        />
      </Head>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          TransitionComponent={Collapse}
        >
          <Toolbar id='back-to-top-anchor' sx={{ position: 'absolute' }} />
          <Component {...pageProps} />
          <ScrollTop {...props} />
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
