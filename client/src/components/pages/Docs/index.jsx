import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useState, useEffect } from 'react';
import Cover from '../../Cover';
import Navbar from '../../Navbar';

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 10;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 10.5 + ITEM_PADDING_TOP,
      // width: 270,
    },
  },
  MenuListProps: {
    style: {
      fontSize: '12px',
    },
  },
};

export default function DocsPage(props) {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [catz, setCatz] = useState([]);
  const [type, setType] = useState('');
  const [level, setLevel] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    const {
      target: { value },
    } = event;

    console.log(value);
    setCategory(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const fetchCategories = async () => {
    const categoriesFromStorage = JSON.parse(
      localStorage.getItem('categories')
    );
    if (categoriesFromStorage) {
      setCatz(categoriesFromStorage);
      setCategories(categoriesFromStorage.map((elem) => elem.name));
      return;
    }

    const categories = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/categories`
    );

    if (categories.data) {
      localStorage.setItem('categories', JSON.stringify(categories.data));
      setCatz(categories.data);

      setCategories(categories.data.map((catz) => catz.name));
    }
  };

  return (
    <Cover>
      <Box
        sx={{
          height: '100%',
          width: '100%',
          padding: 4,
          px: 5,
        }}
      >
        <Typography component='h3' variant='p' fontWeight={600} mb={2}>
          Qedb API
        </Typography>
        <Typography fontSize={15} mb={2}>
          The Open Trivia Database provides a completely free JSON API for use
          in programming projects. Use of this API does not require a API Key,
          just generate the URL below use it in your own application to retrieve
          trivia questions.
        </Typography>

        <Typography fontSize={13} mb={3}>
          All data provided by the API is available under the Creative Commons
          Attribution-ShareAlike 4.0 International License.
        </Typography>

        <Button
          variant='contained'
          color='primary'
          sx={{ fontWeight: 600, px: 5, py: 1.5, mb: 3 }}
        >
          {'API ' + 'Documentation'}
        </Button>

        <Typography mb={3} fontWeight={600}>
          API Helper
        </Typography>

        <TextField
          select
          label='Number of Questions'
          variant='outlined'
          labelId='contribute-question-type-label'
          id='contribute-question-type-label'
          size='medium'
          fullWidth
          sx={{ mb: 1 }}
        >
          <MenuItem value='5'>5</MenuItem>
          <MenuItem value='10'>10</MenuItem>
          <MenuItem value='20'>20</MenuItem>
          <MenuItem value='30'>30</MenuItem>
          <MenuItem value='40'>40</MenuItem>
          <MenuItem value='50'>50</MenuItem>
          <MenuItem value='60'>60</MenuItem>
          <MenuItem value='100'>100</MenuItem>
        </TextField>

        <FormControl sx={{ width: '100%', mb: 2 }}>
          <InputLabel sx={{ fontSize: '.9rem' }} id='multiple-category'>
            Category
          </InputLabel>
          <Select
            sx={{ fontSize: '.7rem' }}
            variant='filled'
            labelId='multiple-category'
            id='multiple-category'
            multiple
            value={category}
            onChange={handleCategoryChange}
            input={<OutlinedInput label='Category' />}
            renderValue={(selected) => selected.join(', ')}
            fullWidth
            MenuProps={MenuProps}
            size='medium'
          >
            {categories.map((catz) => (
              <MenuItem key={catz} value={catz}>
                <Checkbox checked={category.indexOf(catz) > -1} />
                <ListItemText primary={catz} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          select
          label='Type'
          variant='outlined'
          labelId='contribute-question-type-label'
          id='contribute-question-type-label'
          size='medium'
          fullWidth
          sx={{ mb: 1 }}
        >
          <MenuItem value='multiple_choice'>Multiple choice</MenuItem>
          <MenuItem value='boolean'>Boolean</MenuItem>
        </TextField>

        <TextField
          select
          label='Difficulty'
          variant='outlined'
          labelId='contribute-question-type-label'
          id='contribute-question-type-label'
          size='medium'
          fullWidth
          sx={{ mb: 1 }}
        >
          <MenuItem value='easy'>Easy</MenuItem>
          <MenuItem value='medium'>Medium</MenuItem>
          <MenuItem value='hard'>Hard</MenuItem>
        </TextField>

        <Button
          variant='contained'
          color='primary'
          sx={{ fontWeight: 600, px: 5, py: 1.5, mb: 3 }}
          fullWidth
        >
        Generate Link
        </Button>
      </Box>
    </Cover>
  );
}

/*


*/
