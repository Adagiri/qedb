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
import { Typography } from '@mui/material';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const optionTexts = ['a', 'b', 'c', 'd', 'e'];

// var docDefinition = {
//   content: [
//     // if you don't need styles, you can use a simple string to define a paragraph
//     'This is a standard paragraph, using default style',

//     // using a { text: '...' } object lets you set styling properties
//     { text: 'This paragraph will have a bigger font', fontSize: 15 },

//     // if you set the value of text to an array instead of a string, you'll be able
//     // to style any part individually
//     {
//       text: [
//         'This paragraph is defined as an array of elements to make it possible to ',
//         'This paragraph is defined as an array of elements to make it possible to ',
//         { text: 'restyle part of it and make it bigger ', fontSize: 15 },
//         'than the rest.',
//       ],
//     },
//   ],
// };

export default function Contribute() {
  const [query, setQuery] = useState('');
  const [content, setContent] = useState([]);
  const [selected, setSelected] = useState([]);

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

  // console.log('selected', selected);

  const fetchContent = async () => {
    // console.log('query', query);

    const contentData = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/questions${window.location.search}`
    );

    setContent(contentData.data);
  };

  return (
    <Box>
      <Navbar />
      {/* {content.length && <Box width={'100%'}>{JSON.stringify(content)}</Box>} */}

      <Box
        style={{ position: 'absolute', zIndex: -500, top: '-3000px' }}
        mt={8}
        id='selected-questions'
      >
        {selected.map((question, index) => {
          return (
            <Box m={3} mb={6}>
              <Typography
                component='p'
                letterSpacing='.1px'
                fontSize={'15px'}
                mb={1}
              >
                {index + 1}.&nbsp;&nbsp; {question.text}
              </Typography>
              {question.options.map((option, index) => (
                <Typography
                  fontSize={'15px'}
                  letterSpacing='.2px'
                  component='p'
                  m={0.5}
                  ml={3}
                >
                  {['a', 'b', 'c', 'd', 'e'][index]}. {option} &nbsp;&nbsp;
                </Typography>
              ))}
            </Box>
          );
        })}
      </Box>

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
      {/* <ContentModal /> */}

      {selected.length > 0 && (
        <Box
          sx={{
            '& > :not(style)': { m: 1 },
            display: 'flex',
            flexDirection: 'column',
            position: 'fixed',
            bottom: '40px',
            left: '40px',
            width: '20px',
            zIndex: '4000',
          }}
        >
          <Fab color='primary' size='small' aria-label='add'>
            <LibraryAddIcon />
          </Fab>
          <Fab
            onClick={() => pdfMake.createPdf(docDefinition).download()}
            color='primary'
            size='small'
            aria-label='edit'
          >
            <DownloadForOfflineIcon />
          </Fab>

          {/* <Pdf targetRef={ref} filename='code-example.pdf'>
            {({ toPdf }) => (
              <Fab
                onClick={toPdf}
                color='primary'
                size='small'
                aria-label='edit'
              >
                <DownloadForOfflineIcon />
              </Fab>
            )}
          </Pdf> */}
        </Box>
      )}
    </Box>
  );
}

/*
Strategy


*/
