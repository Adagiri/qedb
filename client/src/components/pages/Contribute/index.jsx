import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import Cover from '../../Cover';

export default function Contribute() {
  return (
    <Cover>
      <Box
        component='form'
        sx={{
          '& .MuiTextField-root': { m: 1, width: '250px' },
          fontSize: '15px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 2,
        }}
        // noValidate
        // autoComplete='off'
      >
        {/* Type  */}

        <FormControl variant='filled' sx={{ m: 1, minWidth: '250px' }}>
          <InputLabel id='contribute-question-type-label'>Type</InputLabel>
          <Select
            labelId='contribute-question-type-label'
            id='contribute-question-type-label'
            size='small'
            fullWidth
            required
            // value={age}
            // onChange={handleChange}
          >
            <MenuItem value={10}>Multiple choice</MenuItem>
            <MenuItem value={20}>Boolean</MenuItem>
          </Select>
        </FormControl>

        {/* Question text */}
        <TextField
          required
          id='text'
          label='Question'
          size='small'
          placeholder='What is biology ?'
          variant='filled'
          fullWidth
        />

        {/* Type  */}

        <FormControl variant='filled' sx={{ m: 1, minWidth: '250px' }}>
          <InputLabel id='contribute-question-category-label'>Category</InputLabel>
          <Select
            labelId='contribute-question-category-label'
            id='demo-simple-select-filled'
            size='small'
            fullWidth
            required
            // value={age}
            // onChange={handleChange}
          >
            <MenuItem value={10}>Multiple choice</MenuItem>
            <MenuItem value={20}>Boolean</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Cover>
  );
}

// Question type
//   select

// Category
//   select
// Difficulty
//   select
// Answer
//   select
// Options
//   [input]
// Credits
//   [{title: input, link: input}]
// Explanation
//   textArea
