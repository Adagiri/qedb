import { Badge, Box, Button, Grid, Paper, Typography } from '@mui/material';
import Cover from '../Cover';
import Navbar from '../Navbar';

import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import MailIcon from '@mui/icons-material/Mail';
import axios from 'axios';
import { useRouter } from 'next/router';

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 10;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

const TYPES = ['Multiple choice', 'Boolean'];
const LEVELS = ['Easy', 'Medium', 'Hard'];

export default function HomeComponent() {
  const router = useRouter();
  const [categories, setCategories] = React.useState([]);
  const [category, setCategory] = React.useState([]);
  const [type, setType] = React.useState([]);
  const [level, setLevel] = React.useState([]);

  React.useEffect(() => {
    // Get Categories
    getCategories();
  }, []);

  const handleSearch = () => {
    // Transform category
    let categoriesCache = JSON.parse(localStorage.getItem('categories'));
    const categoryQuery = category
      .map((catz) => categoriesCache.find((catzs) => catzs.name === catz).key)
      .join(',');

    // Transform type
    const typeQuery = type.join(',').toLowerCase().replace(' ', '_');

    // Transform level
    const levelQuery = level.join(',').toLowerCase().replace(' ', '_');

    const url = `/content?select=text,type,difficulty,category,options,answer,image,author${
      categoryQuery && '&category=' + categoryQuery
    }${typeQuery && '&type=' + typeQuery}${
      levelQuery && '&difficulty=' + levelQuery
    }`;

    router.push(url);
  };

  const getCategories = async () => {
    const categoriesFromStorage = JSON.parse(
      localStorage.getItem('categories')
    );
    if (categoriesFromStorage) {
      setCategories(categoriesFromStorage.map((elem) => elem.name));
    }

    const categories = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/categories`
    );
    if (categories.data) {
      localStorage.setItem('categories', JSON.stringify(categories.data));
      setCategories(categories.data.map((catz) => catz.name));
    }
  };

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

  const handleTypeChange = (event) => {
    const {
      target: { value },
    } = event;

    console.log(value);
    setType(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const handleLevelChange = (event) => {
    const {
      target: { value },
    } = event;

    console.log(value);
    setLevel(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };
  return (
    <Cover>
      <Box
        sx={{
          px: { md: '3rem' },
          py: { md: '1.5rem' },
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100%',
        }}
      >
        <Box
          sx={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100%',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              textAlign: 'center',
              borderRadius: { md: '10px' },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              color: '#fff',
              padding: '1rem',
            }}
          >
            <Box mt={2}>
              <Typography
                variant='h4'
                component='h1'
                color='primary'
                mb={0.5}
                fontWeight={600}
              >
                Welcome to QEDB,
              </Typography>
              <Typography variant='P' color='primary.dark' component='P'>
                a plartform to fetch enough resources for your project.
              </Typography>
              {/* 
              <Paper elevation={5}>
                <Box width={"80%"} p={2} mt={3} fontSize=".9rem" fontWeight={"600"} display='flex' justifyContent={'space-around'}>
                  <Typography variant='p' color='primary.dark' component='p'>
                    3500 Questions
                  </Typography>

                  <Typography variant='p' textAlign={"right"} color='primary.dark' component='p'>
                    35 Today
                  </Typography>
                </Box>
              </Paper> */}
            </Box>

            <Box mb={2}>
              <Typography
                variant='P'
                component='p'
                fontWeight={600}
                color='#1B3C36'
                mb={4}
              >
                Kindly select the type of questions you want using the filter
                below.
              </Typography>
              <Typography
                variant='p'
                color='primary'
                component='h2'
                mb={5}
                fontWeight={600}
              >
                Search By Filter
              </Typography>

              <Grid
                container
                spacing={2}
                justifyContent='center'
                alignItems='center'
                mb={5}
              >
                <Grid item xs='auto'>
                  {/* category */}
                  <FormControl sx={{ width: 120 }}>
                    <InputLabel
                      sx={{ fontSize: '.9rem' }}
                      id='multiple-category'
                    >
                      Category
                    </InputLabel>
                    <Select
                      sx={{ fontSize: '.7rem' }}
                      labelId='multiple-category'
                      id='multiple-category'
                      multiple
                      value={category}
                      onChange={handleCategoryChange}
                      input={<OutlinedInput label='Category' />}
                      renderValue={(selected) => selected.join(', ')}
                      autoWidth
                      MenuProps={MenuProps}
                    >
                      {categories.map((catz) => (
                        <MenuItem key={catz} value={catz}>
                          <Checkbox checked={category.indexOf(catz) > -1} />
                          <ListItemText primary={catz} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs='auto'>
                  {/* type */}

                  <FormControl sx={{ width: 120 }}>
                    <InputLabel
                      sx={{ fontSize: '.9rem' }}
                      id='multiple-type-label'
                    >
                      Type
                    </InputLabel>
                    <Select
                      sx={{ fontSize: '.7rem' }}
                      labelId='multiple-type-label'
                      id='multiple-type'
                      label='Type'
                      multiple
                      value={type}
                      onChange={handleTypeChange}
                      // input={<OutlinedInput label='Type' />}
                      renderValue={(selected) => selected.join(', ')}
                      autoWidth
                      MenuProps={MenuProps}
                    >
                      {TYPES.map((typ) => (
                        <MenuItem key={typ} value={typ}>
                          <Checkbox checked={type.indexOf(typ) > -1} />
                          <ListItemText primary={typ} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs='auto'>
                  {/* level */}

                  <FormControl sx={{ width: 120 }}>
                    <InputLabel
                      sx={{ fontSize: '.9rem' }}
                      id='demo-multiple-checkbox-label'
                    >
                      Level
                    </InputLabel>
                    <Select
                      sx={{ fontSize: '.7rem' }}
                      labelId='multiple-level'
                      id='multiple-level'
                      multiple
                      value={level}
                      onChange={handleLevelChange}
                      input={<OutlinedInput label='Type' />}
                      renderValue={(selected) => selected.join(', ')}
                      autoWidth
                      MenuProps={MenuProps}
                    >
                      {LEVELS.map((lvl) => (
                        <MenuItem key={lvl} value={lvl}>
                          <Checkbox checked={level.indexOf(lvl) > -1} />
                          <ListItemText primary={lvl} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Button
                variant='contained'
                size='large'
                sx={{ width: '70%' }}
                onClick={handleSearch}
              >
                Search
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Cover>
  );
}

/*
On clicking the button,
Take the value of level, category, type and convert to proper types understood by the server
Create a url from above and direct to the content page 
*/
