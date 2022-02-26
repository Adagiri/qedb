import * as React from 'react';
import { Box, Chip, useMediaQuery, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  CreateButton,
  ExportButton,
  FilterButton,
  FilterForm,
  FilterContext,
  InputProps,
  ListBase,
  ListProps,
  NumberInput,
  Pagination,
  ReferenceInput,
  SearchInput,
  SelectInput,
  SortButton,
  Title,
  TopToolbar,
  useListContext,
  useTranslate,
  ArrayField,
  ChipField,
  Datagrid,
  DateField,
  List,
  NumberField,
  SingleFieldList,
  TextField,
  UrlField,
} from 'react-admin';

import GridList from './GridList';
import Aside from './Aside';

const useQuickFilterStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1),
  },
}));

const QuickFilter = ({ label }) => {
  const translate = useTranslate();
  const classes = useQuickFilterStyles();
  return <Chip className={classes.root} label={translate(label)} />;
};

export const productFilters = [
  <SearchInput source='title' alwaysOn />,

  <ReferenceInput
    source='category'
    reference='categories'
    sort={{ field: 'name', order: 'ASC' }}
  >
    <SelectInput source='name' />
  </ReferenceInput>,

  <ReferenceInput
    source='author'
    reference='authors'
    sort={{ field: 'name', order: 'ASC' }}
  >
    <SelectInput source='name' />
  </ReferenceInput>,

  <NumberInput source='price' />,

  <QuickFilter label='Out of stock' source='stock' defaultValue={0} />,

  <QuickFilter label='Never sold' source='sales' defaultValue={0} />,
];

const ListActions = ({ isSmall }) => (
  <TopToolbar>
    {isSmall && <FilterButton />}
    <SortButton fields={['title', 'price', 'sales', 'stock']} />
    <CreateButton basePath='/products' />
    <ExportButton />
  </TopToolbar>
);

export const ProductList = (props) => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  return (
    <ListBase
      perPage={15}
      sort={{ field: 'createdAt', order: 'ASC' }}
      {...props}
    >
      <ProductListView isSmall={isSmall} />
    </ListBase>
  );
};

const ProductListView = ({ isSmall }) => {
  const { defaultTitle } = useListContext();
  return (
    <>
      <Title defaultTitle={defaultTitle} />
      {/* filter */}
      <FilterContext.Provider value={productFilters}>
        <ListActions isSmall={isSmall} />
        {isSmall && (
          <Box m={1}>
            <FilterForm />
          </Box>
        )}
      </FilterContext.Provider>
      <Box display='flex'>
        <Aside />
        <Box width={isSmall ? 'auto' : 'calc(100% - 16em)'}>
          <GridList />
          <Pagination rowsPerPageOptions={[10, 20, 40]} />
        </Box>
      </Box>
    </>
  );
};
