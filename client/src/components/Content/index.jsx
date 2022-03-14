import { Box } from '@mui/system';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Cover from '../Cover';
import Navbar from '../Navbar';
import ContentCard from './ContentCard';

export default function Contribute() {
  const [query, setQuery] = useState('');
  const [content, setContent] = useState([]);

  useEffect(() => {
    setQuery(window.location.search);

    fetchContent();
  }, []);

  const fetchContent = async () => {
    console.log('query', query);

    const contentData = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/questions${window.location.search}`
    );

    setContent(contentData.data);

    console.log(contentData);
  };

  return (
    <Box>
      <Navbar />
      {/* {content.length && <Box width={'100%'}>{JSON.stringify(content)}</Box>} */}
      <Box p={2}>
        {content.map((cont) => (
          <ContentCard key={cont.id} {...cont} />
        ))}
      </Box>
    </Box>
  );
}

/*


*/
