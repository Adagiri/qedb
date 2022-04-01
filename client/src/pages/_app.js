import '../styles/globals.css';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import useScrollTrigger from '@mui/material/useScrollTrigger';

import { Fab, Zoom } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Head from 'next/head';

// optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 3000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

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

function ScrollTop(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor'
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role='presentation'
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

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

          <ScrollTop {...props}>
            <Fab color='primary' size='small' aria-label='scroll back to top'>
              <KeyboardArrowUpIcon />
            </Fab>
          </ScrollTop>
        </ThemeProvider>
      </SnackbarProvider>
    </>
  );
}

export default MyApp;
