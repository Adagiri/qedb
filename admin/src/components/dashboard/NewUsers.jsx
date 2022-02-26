import * as React from 'react';
import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CustomerIcon from '@material-ui/icons/PersonAdd';
import { Link } from 'react-router-dom';
import { useTranslate, useQueryWithStore } from 'react-admin';
import { subDays } from 'date-fns';
import usersRecord from '../users/index';

import CardWithIcon from './CardWithIcon';

const NewUsers = () => {
  const translate = useTranslate();
  const classes = useStyles();

  const aMonthAgo = subDays(new Date(), 30);
  aMonthAgo.setDate(aMonthAgo.getDate() - 30);
  aMonthAgo.setHours(0);
  aMonthAgo.setMinutes(0);
  aMonthAgo.setSeconds(0);
  aMonthAgo.setMilliseconds(0);

  const { loaded, data: users } = useQueryWithStore({
    type: 'getList',
    resource: 'users',
    payload: {
      filter: {
        createdAt: { gte: aMonthAgo.toISOString() },
      },
      sort: { field: 'createdAt', order: 'DESC' },
      pagination: { page: 1, perPage: 50 },
    },
  });

  console.log('users', users);

  // if (!loaded) return null;

  const nb = users ? users.reduce((nb) => ++nb, 0) : 0;
  return (
    <CardWithIcon
      to='/users'
      icon={usersRecord.icon}
      title={'New users'}
      subtitle={nb}
    >
      <List>
        {users
          ? users.slice(0, 5).map((record) => (
              <ListItem
                button
                to={`/users/${record.id}`}
                component={Link}
                key={record.id}
              >
                <ListItemAvatar>
                  <Avatar
                    src={`${
                      record.avatar ||
                      'https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_960_720.png'
                    }?size=32x32`}
                  />
                </ListItemAvatar>
                <ListItemText primary={`${record.username}`} />
              </ListItem>
            ))
          : null}
      </List>
      <Box flexGrow='1'>&nbsp;</Box>
      <Button
        className={classes.link}
        component={Link}
        to='/users'
        size='small'
        color='primary'
      >
        <Box p={1} className={classes.linkContent}>
          {'All users'}
        </Box>
      </Button>
    </CardWithIcon>
  );
};

const useStyles = makeStyles((theme) => ({
  link: {
    borderRadius: 0,
  },
  linkContent: {
    color: theme.palette.primary.main,
  },
}));

export default NewUsers;
