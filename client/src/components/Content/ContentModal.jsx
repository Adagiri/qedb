import { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ButtonGroup } from '@mui/material';
import Image from 'next/image';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  // px: 2
};

export default function ContentModal(props) {
  const { question, setQuestion } = props;

  const open = Object.keys(question).length > 0 ? true : false;

  const handleClose = () => setQuestion({});

  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        onBackdropClick={handleClose}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id='transition-modal-title'
              variant='p'
              component='h4'
              color='primary'
            >
              {question.category &&
                question.category.map((catz) => catz + ', ')}
            </Typography>
            <Typography
              id='transition-modal-description'
              sx={{ mt: 2, mb: 2 }}
              component='p'
            >
              {question.text}
            </Typography>

            {question.image && (
              <Image
                src={question.image}
                height='200px'
                width='300px'
                objectFit='cover'
              />
            )}
            <Box
              variant='contained'
              aria-label='outlined primary button group'
              sx={{
                mt: 2,
                display: 'flex',
                justifyContent: 'flex-start',
                flexWrap: 'wrap',
              }}
            >
              {question.options &&
                question.options.map((option) => (
                  <Button
                    variant='contained'
                    color={question.answer === option ? 'primary' : 'error'}
                    key={option}
                    size='small'
                    sx={{ m: 0.8, ml: 0, display: 'inline-block', px: 1 }}
                    // disabled
                  >
                    {option}
                  </Button>
                ))}
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
