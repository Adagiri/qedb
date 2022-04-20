import { Box } from '@mui/system';
import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Cover from '../../Cover';
import Navbar from '../../Navbar';
import ContentCard from './ContentCard';
import Fab from '@mui/material/Fab';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import SaveQuestionsModal from './SaveQuestionsModal';
import MainLoader from '../../Loader/MainLoader';
import { useSnackbar } from 'notistack';
import Image from 'next/image';
import { useRouter } from 'next/router';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { IconButton } from '@mui/material';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const optionTexts = ['a', 'b', 'c', 'd', 'e', 'f'];

export default function Contribute() {
  const [query, setQuery] = useState('');
  const [user, setUser] = useState({});
  const [content, setContent] = useState([]);
  const [hasMoreData, setHasMoreResult] = useState(false);
  const [loader, setLoader] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [selected, setSelected] = useState([]);
  const [addQuestionModal, setAddQuestionModal] = useState(false);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(15);
  const { enqueueSnackbar } = useSnackbar();

  const LIMIT = 10;
  const router = useRouter();

  const docDefinition = {
    pageMargins: [15, 40, 15, 40],
    content: [],
    styles: {
      text: { fontSize: 12, margin: [0, 20, 0, 10], characterSpacing: 0.08 },
      options: {
        margin: [17, 0, 0, 10],
      },
    },
  };

  selected.forEach((question, index) => {
    const toAdd = [];

    toAdd.push(
      // { text: `${index + 1}.  `, margin: 3 },
      { text: `${index + 1}.  ${question.text}`, style: 'text' }
      // { text: `${question.text}`, margin: 3 }
    );

    question.options.forEach((opt, index) => {
      toAdd.push({
        text: `   ${optionTexts[index]}. ${opt}`,
        style: 'options',
      });
    });

    docDefinition.content.push(...toAdd);
  });

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    const user = JSON.parse(localStorage.getItem('user'));

    if (token && user) {
      setUser(user);
    }

    setQuery(window.location.search);

    fetchContent(0, 15);
  }, []);

  const fetchContent = async (_start, _end) => {
    try {
      setFetching(true);
      const contentData = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/questions${window.location.search}&_start=${_start}&_end=${_end}&limit=${LIMIT}`
      );
      console.log(contentData);
      setContent([...content, ...contentData.data]);
      setHasMoreResult(contentData.headers['has-more-result'] === "true"? true : false);
      setLoader(false);
      setFetching(false);
      setStart(end);
      setEnd(end + LIMIT);
    } catch (error) {
      console.log(error);
      setFetching(false);
      setLoader(false);
    }
  };

  // Fetch more on scroll logic
  const listInnerRef = useRef();
  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        if (hasMoreData && !fetching) {
          fetchContent(start, end);
        }
      }
    }
  };

  if (loader) {
    return <MainLoader loader={loader} />;
  }

  return (
    <Box
      onScroll={onScroll}
      ref={listInnerRef}
      sx={{ overflowY: 'auto', height: '100vh' }}
    >
      <Navbar />
      <Box width='100%' sx={{ position: 'relative' }} p={2}>
        <Fab
          color='primary'
          size='medium'
          aria-label='download'
          sx={{ position: 'fixed', bottom: '20px', right: '20px' }}
        >
          <ChangeCircleIcon />
        </Fab>
     
        {content.map((cont) => (
          <ContentCard
            selected={selected}
            setSelected={setSelected}
            key={cont.id}
            content={cont}
          />
        ))}
        {fetching && (
          <Box width='100%' textAlign='center'>
            <Image src={'/loadIcon_colored.svg'} height='50px' width='50px' />
          </Box>
        )}
      </Box>

      {selected.length > 0 && (
        <Box
          sx={{
            '& > :not(style)': { m: 1 },
            display: 'flex',
            flexDirection: 'column',
            position: 'fixed',
            bottom: '40px',
            left: '60px',
            width: '20px',
            zIndex: '5',
            height: 'auto',
          }}
        >
          <Fab
            color='error'
            onClick={() => {
              if (Object.keys(user).length === 0) {
                router.push('/signin');

                enqueueSnackbar('Please login to add library', {
                  variant: 'error',
                });
              } else {
                setAddQuestionModal(true);
              }
            }}
            size='medium'
            aria-label='add'
          >
            <LibraryAddIcon />
          </Fab>
          <Fab
            onClick={() => pdfMake.createPdf(docDefinition).download()}
            color='primary'
            size='medium'
            aria-label='download'
          >
            <DownloadForOfflineIcon />
          </Fab>
        </Box>
      )}

      {addQuestionModal && (
        <SaveQuestionsModal
          addQuestionModal={addQuestionModal}
          setAddQuestionModal={setAddQuestionModal}
          selected={selected}
        />
      )}
    </Box>
  );
}

/*
Strategy


*/
