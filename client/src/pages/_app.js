import '../styles/globals.css';

import Toolbar from '@mui/material/Toolbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import Head from 'next/head';
import ScrollTop from '../components/ScrollToTop';

const theme = createTheme({
  palette: {
    primary: {
      main: '#449788',
      light: '##93CBC1',
      dark: '#1B3C36',
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
      <SnackbarProvider maxSnack={3}>
        <ThemeProvider theme={theme}>
          <Toolbar id='back-to-top-anchor' sx={{ position: 'absolute' }} />
          <Component {...pageProps} />
          <ScrollTop {...props} />
        </ThemeProvider>
      </SnackbarProvider>
    </>
  );
}

export default MyApp;
