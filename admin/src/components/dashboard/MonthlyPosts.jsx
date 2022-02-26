import * as React from 'react';
import DollarIcon from '@material-ui/icons/LibraryBooks';
import { useTranslate } from 'react-admin';

import CardWithIcon from './CardWithIcon';



const MonthlyPosts = (props) => {
  const { value } = props;
  return (
    <CardWithIcon
      to='/questions'
      icon={DollarIcon}
      title='Monthly Posts'
      subtitle={value}
    />
  );
};

export default MonthlyPosts;
