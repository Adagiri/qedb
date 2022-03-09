import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link as MuiLink } from '@mui/material';
import { Zoom } from '@mui/material';
import Link from 'next/link';
import LoginIcon from '@mui/icons-material/Login';

const pages = ['api', 'contribute', 'practice'];
const settings = ['profile', 'dashboard', 'logout'];

const Navbar = () => {
  const [currentPath, setCurrentPath] = React.useState('');
  const [user, setUser] = React.useState({});
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  console.log(user);

  React.useEffect(() => {
    const path = window.location.pathname.slice(1);
    const userObj = JSON.parse(localStorage.getItem('user'));
    userObj && setUser(userObj);
    setCurrentPath(path);
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (event) => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position='static' color='primary'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ ml: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <Link passHref href='/'>
              <MuiLink
                sx={{
                  cursor: 'pointer',
                }}
                variant='body2'
              >
                <img src='qedb.svg' />
              </MuiLink>
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign='center'>
                    {' '}
                    <Link passHref href={page === '/' ? '/' : `/${page}`}>
                      <MuiLink
                        sx={{
                          cursor: 'pointer',
                          textDecorationLine: 'none',
                          textTransform: 'capitalize',
                          marginTop: 0,
                          marginBottom: 0,
                          color: "#000"
                        }}
                        variant='body2'
                      >
                        {page}
                      </MuiLink>
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <Link passHref href='/'>
              <MuiLink
                sx={{
                  cursor: 'pointer',
                }}
                variant='body2'
              >
                <img src='qedb.svg' />
              </MuiLink>
            </Link>
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'flex-end',
              marginRight: '1rem',
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  mx: 0,
                  px: 1.2,
                  color: 'white',
                  border:
                    currentPath === page.toLowerCase()
                      ? '1.7px solid #fff'
                      : '',
                  '&:hover': {
                    border:
                      currentPath === page.toLowerCase()
                        ? '1.7px solid #fff'
                        : '',
                  },
                  borderRadius: '50px',
                  textTransform: 'capitalize',
                }}
                variant='outlined'
              >
                <Link
                  passHref
                  href={page === 'home' ? '/' : `/${page.toLowerCase()}`}
                >
                  <MuiLink
                    sx={{
                      cursor: 'pointer',
                      textDecorationLine: 'none',
                      color: '#fff',
                      fontSize: '.75rem',
                      fontWeight: '500',
                    }}
                    variant='body2'
                  >
                    {page}
                  </MuiLink>
                </Link>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {/* Check if user is logged in. If not render login icon */}
            {Object.keys(user).length ? (
              <>
                {' '}
                <Tooltip title='Open settings'>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      sx={{
                        m: 1,
                        bgcolor: 'secondary.main',
                        color: 'primary.main',
                        width: 24,
                        height: 24,
                        fontSize: ".8rem",
                        fontWeight: "600"
                      }}
                      alt={user.username}
                    >
                      {user.username[0]}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id='menu-appbar'
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => {
                        if (setting === 'logout') {
                          localStorage.removeItem('user');
                          localStorage.removeItem('token');
                          setUser({});
                        }
                        handleCloseUserMenu();
                      }}
                    >
                      <Typography textAlign='center'>{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>{' '}
              </>
            ) : (
              <IconButton size='small' color='primary' sx={{ p: 0 }}>
                <Link href='/signin'>
                  <Avatar
                    sx={{
                      m: 1,
                      bgcolor: 'secondary.main',
                      color: 'primary.main',
                      width: 24,
                      height: 24,
                    }}
                  />
                </Link>
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
