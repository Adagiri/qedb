import * as React from 'react';
import { Fragment, useCallback, useEffect, useState } from 'react';
import {
  AutocompleteInput,
  BooleanField,
  Datagrid,
  DatagridProps,
  DateField,
  DateInput,
  Identifier,
  ArrayField,
  List,
  ListContextProvider,
  ListProps,
  NullableBooleanInput,
  NumberField,
  ReferenceInput,
  ReferenceField,
  SearchInput,
  TextField,
  TextInput,
  useGetList,
  useListContext,
  FunctionField,
  ShowButton,
  Show,
  SimpleShowLayout,
  ReferenceArrayField,
  SelectArrayInput,
  ReferenceArrayInput,
  SelectInput,
  SortButton,
  TopToolbar,
  CreateButton,
  ExportButton,
} from 'react-admin';
import { useMediaQuery, Divider, Tabs, Tab, Theme } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import UserReferenceField from '../users/UserReferenceField';
import ThumbnailField from './ThumbnailField';

const ViewButton = ({ record }) => (
  <ShowButton basePath='/questions' record={record} />
);

const questionFilters = [
  <SearchInput source='q' alwaysOn />,

  <ReferenceInput source='category' reference='categories'>
    <SelectInput source='name' />
  </ReferenceInput>,
];

const useDatagridStyles = makeStyles({
  total: { fontWeight: 'bold' },
});

const tabs = [
  { id: 'pending', name: 'pending' },
  { id: 'approved', name: 'approved' },
  { id: 'rejected', name: 'rejected' },
];

const useGetTotals = (filterValues) => {
  const { total: totalPending } = useGetList(
    'questions',
    { perPage: 1, page: 1 },
    { field: 'createdAt', order: 'ASC' },
    { ...filterValues, status: 'pending' }
  );
  const { total: totalApproved } = useGetList(
    'questions',
    { perPage: 1, page: 1 },
    { field: 'createdAt', order: 'ASC' },
    { ...filterValues, status: 'approved' }
  );
  const { total: totalRejected } = useGetList(
    'questions',
    { perPage: 1, page: 1 },
    { field: 'createdAt', order: 'ASC' },
    { ...filterValues, status: 'rejected' }
  );
  return {
    pending: totalPending,
    approved: totalApproved,
    rejected: totalRejected,
  };
};

const TabbedDatagrid = (props) => {
  const listContext = useListContext();
  const { ids, filterValues, setFilters, displayedFilters } = listContext;
  const classes = useDatagridStyles();
  const isXSmall = useMediaQuery((theme) => theme.breakpoints.down('xs'));
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [rejected, setRejected] = useState([]);
  const totals = useGetTotals(filterValues);

  useEffect(() => {
    if (ids && ids !== filterValues.status) {
      switch (filterValues.status) {
        case 'pending':
          setPending(ids);
          break;
        case 'approved':
          setApproved(ids);
          break;
        case 'rejected':
          setRejected(ids);
          break;
      }
    }
  }, [ids, filterValues.status]);

  const handleChange = useCallback(
    (event, value) => {
      setFilters &&
        setFilters({ ...filterValues, status: value }, displayedFilters);
    },
    [displayedFilters, filterValues, setFilters]
  );

  const selectedIds =
    filterValues.status === 'pending'
      ? pending
      : filterValues.status === 'approved'
      ? approved
      : rejected;

  return (
    <Fragment>
      <Tabs
        variant='fullWidth'
        centered
        value={filterValues.status}
        indicatorColor='primary'
        onChange={handleChange}
      >
        {tabs.map((choice) => (
          <Tab
            key={choice.id}
            label={
              totals[choice.name]
                ? `${choice.name} (${totals[choice.name]})`
                : choice.name
            }
            value={choice.id}
          />
        ))}
      </Tabs>
      <Divider />

      <div>
        {filterValues.status === 'pending' && (
          <ListContextProvider value={{ ...listContext, ids: pending }}>
            <Datagrid {...props} optimized rowClick='edit'>
              <ThumbnailField />
              {!isXSmall && <DateField source='createdAt' />}

              <UserReferenceField />

              <TextField source='text' />

              {!isXSmall && <TextField source='type' />}
              {!isXSmall && <TextField source='difficulty' />}

              {!isXSmall && <TextField source='category' />}
              <ViewButton />
            </Datagrid>
          </ListContextProvider>
        )}
        {filterValues.status === 'approved' && (
          <ListContextProvider value={{ ...listContext, ids: approved }}>
            <Datagrid {...props} optimized rowClick='edit'>
              <ThumbnailField />
              {!isXSmall && <DateField source='createdAt' />}

              <UserReferenceField />
              <TextField source='text' />

              {!isXSmall && <TextField source='type' />}
              {!isXSmall && <TextField source='difficulty' />}

              {!isXSmall && <TextField source='category' />}
              <ViewButton />
            </Datagrid>
          </ListContextProvider>
        )}
        {filterValues.status === 'rejected' && (
          <ListContextProvider value={{ ...listContext, ids: rejected }}>
            <Datagrid {...props} optimized rowClick='edit'>
              <ThumbnailField />
              {!isXSmall && <DateField source='createdAt' />}

              <UserReferenceField />

              {!isXSmall && <TextField source='type' />}
              {!isXSmall && <TextField source='difficulty' />}

              {!isXSmall && <TextField source='category' />}
              <ViewButton />
            </Datagrid>
          </ListContextProvider>
        )}
      </div>
    </Fragment>
  );
};

const ListActions = () => (
  <TopToolbar>
    <SortButton fields={['createdAt']} />
    <CreateButton basePath='/questions' />
    <ExportButton />
  </TopToolbar>
);

const QuestionList = (props) => (
  <List
    {...props}
    // actions={<ListActions />}
    filterDefaultValues={{ status: 'pending' }}
    sort={{ field: 'createdAt', order: 'ASC' }}
    perPage={10}
    filters={questionFilters}
  >
    <TabbedDatagrid />
  </List>
);

export const QuestionShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      {/* <TextField source="author.id" />
            <ReferenceField source="_id" reference="s"><TextField source="id" /></ReferenceField>
            <TextField source="type" /> */}
      <TextField source='id' />
      <TextField source='difficulty' />
      <TextField source='text' />
      <ArrayField source='options'>
        <TextField source='text' />
      </ArrayField>
      <TextField label='Answer id' source='answer' />
      <ArrayField source='credits'>
        <Datagrid>
          <TextField source='title' />
          <TextField source='link' />
        </Datagrid>
      </ArrayField>
      <TextField source='status' />
      <ReferenceArrayField source='category' reference='categories'>
        <Datagrid>
          <TextField label='c' source='name' />
        </Datagrid>
      </ReferenceArrayField>
      <DateField label='posted on' source='createdAt' />
    </SimpleShowLayout>
  </Show>
);

export default QuestionList;
