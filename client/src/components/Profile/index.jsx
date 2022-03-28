import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Cover from '../Cover';
import Navbar from '../Navbar';
import ContentCard from './id';

export default function Contribute() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));

    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  return (
    <Box>
      <Typography>{user.username}</Typography>
      <Typography>Email: {user.email}</Typography>
      <Typography>Approved questions: {user.qapproved}</Typography>
      <Typography>Pending questions: {user.qpending}</Typography>
      <Typography>Role questions: {user.role}</Typography>
    </Box>
  );
}

/*


*/
