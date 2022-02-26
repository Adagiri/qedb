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
  TextInput,
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
  EmailField,
  ShowButton,
  SimpleShowLayout,
  Show,
} from 'react-admin';
import LinkToRelatedQuestions from './LinkToRelatedQuestions';

const ViewButton = ({ record }) => (
  <ShowButton basePath='/users' record={record} />
);

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
  <TextInput source='q' label='Search' alwaysOn />,
  <QuickFilter label='Has Posts' source='hasPosts' defaultValue={true} />,
  <QuickFilter label='Users' source='role' defaultValue={'User'} />,
  <QuickFilter label='Moderators' source='isModerator' defaultValue={true} />,
  <QuickFilter label='Admins' source='isAdmin' defaultValue={true} />,
];

const ListActions = ({ isSmall }) => (
  <TopToolbar>
    <FilterButton />
    {/* <SortButton fields={['createdAt', 'qposted', 'qapproved', 'qrejected']} /> */}
    {/* <CreateButton basePath='/users' /> */}
    <ExportButton />
  </TopToolbar>
);

export const UserList = (props) => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  return (
    <ListBase
      perPage={10}
      sort={{ field: 'createdAt', order: 'ASC' }}
      {...props}
    >
      <UserListView isSmall={isSmall} />
    </ListBase>
  );
};

const UserListView = ({ isSmall }) => {
  const { defaultTitle } = useListContext();
  return (
    <>
      <Title defaultTitle={defaultTitle} />
      {/* filter */}
      <FilterContext.Provider value={productFilters}>
        <ListActions isSmall={isSmall} />

        <Box m={1}>
          <FilterForm />
        </Box>
      </FilterContext.Provider>
      {/* <Box display='flex' justifyContent='flex-end'> */}
      {/* <Aside /> */}
      <Box width='auto'>
        {/* <GridList /> */}
        <Datagrid rowClick='edit'>
          <TextField source='username' />
          {!isSmall && <EmailField source='email' />}
          <TextField source='role' />
          <NumberField label='posted' source='qposted' />
          <NumberField
            label={isSmall ? 'rej' : 'rejected'}
            source='qrejected'
          />
          <NumberField
            label={isSmall ? 'app' : 'approved'}
            source='qapproved'
          />

          <ViewButton />
          <LinkToRelatedQuestions />
        </Datagrid>
        <Pagination rowsPerPageOptions={[5, 10, 15, 20, 50]} />
      </Box>
      {/* </Box> */}
    </>
  );
};

export const UserShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <EmailField source='email' />
      <TextField source='role' />
      <TextField source='username' />
      <TextField label='Posted questions' source='qposted' />
      <TextField label='Pending questions' source='qpending' />
      <TextField label='Rejected questions' source='qrejected' />
      <TextField label='Approved questions' source='qapproved' />
      <DateField label='signup date' source='createdAt' />
      <TextField source='id' />
    </SimpleShowLayout>
  </Show>
);
