import * as React from 'react';
import {
  Admin,
  Resource,

  ShowGuesser,
} from 'react-admin';
import Dashboard from './dashboard/Dashboard';
import authProvider from '../../providers/authProvider';
import users from './users/index';
import categories from './categories/index';
import questions from './questions/index';
import myDataProvider from '../../providers/dataProvider';

const App = () => {
  return (
    <Admin
      authProvider={authProvider}
      dataProvider={myDataProvider}
      dashboard={Dashboard}
    >
      <Resource name='users' {...users} />
      <Resource name='categories' {...categories} />
      <Resource name='questions' show={ShowGuesser} {...questions} />
    </Admin>
  );
};

export default App;
