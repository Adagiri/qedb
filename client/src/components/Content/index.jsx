import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cover from '../Cover';
import Navbar from '../Navbar';
import ContentCard from './ContentCard';
import ContentModal from './ContentModal';
import Fab from '@mui/material/Fab';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
// import Pdf from 'react-to-pdf';
import { Alert, Typography } from '@mui/material';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import SaveQuestionsModal from './SaveQuestionsModal';
import MainLoader from '../Loader/MainLoader';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const optionTexts = ['a', 'b', 'c', 'd', 'e', 'f'];

export default function Contribute() {
  const [query, setQuery] = useState('');
  const [content, setContent] = useState([]);
  const [loader, setLoader] = useState(true);
  const [selected, setSelected] = useState([]);
  const [addQuestionModal, setAddQuestionModal] = useState(false);

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
    setQuery(window.location.search);

    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const contentData = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/questions${window.location.search}`
      );

      setContent(contentData.data);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  return (
    <Box>
      <Navbar />
      {/* {content.length && <Box width={'100%'}>{JSON.stringify(content)}</Box>} */}
      {loader ? (
        <MainLoader loader={loader} />
      ) : (
        <Box p={2}>
          {content.map((cont) => (
            <ContentCard
              selected={selected}
              setSelected={setSelected}
              key={cont.id}
              content={cont}
            />
          ))}
        </Box>
      )}
      {/* <ContentModal /> */}

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
          }}
        >
          <Fab
            color='error'
            onClick={() => setAddQuestionModal(true)}
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
