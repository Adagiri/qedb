import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Image from 'next/image';

export default function ContentCard(prop) {
  const theme = useTheme();
  const { image, text, author } = prop;
  return (
    <Card
      sx={{
        display: 'flex',
        marginBottom: '1rem',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component='p' variant='p'>
            {text}
          </Typography>
          <Typography
            variant='subtitle1'
            color='text.secondary'
            component='div'
          >
            {author?.username}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          {/* <IconButton aria-label='previous'>
            {theme.direction === 'rtl' ? (
              <SkipNextIcon />
            ) : (
              <SkipPreviousIcon />
            )}
          </IconButton>
          <IconButton aria-label='play/pause'>
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          <IconButton aria-label='next'>
            {theme.direction === 'rtl' ? (
              <SkipPreviousIcon />
            ) : (
              <SkipNextIcon />
            )}
          </IconButton> */}
        </Box>
      </Box>
      <Box sx={{ position: 'relative', width: '100px' }}>
        <Image
          src={image || 'https://qedb.s3.amazonaws.com/qedb-colored.svg'}
          alt='Live from space album cover'
          layout='fill'
          // width={"80px"}
          // height={'20px'}
        />
      </Box>
    </Card>
  );
}


/*
__Tasks
proper text limit in typography
resizing images
link to users profile when username is clicked
*/