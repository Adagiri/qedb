import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { useEffect, useState } from 'react';
export default function Contribute() {
  const [user, setUser] = useState({});

  const fetchContent = async () => {
    const userId = window.location.pathname.slice(9);

    const user = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/${userId}`
    );

    setUser(user.data);
    
  };

  useEffect(() => {
    fetchContent();
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
