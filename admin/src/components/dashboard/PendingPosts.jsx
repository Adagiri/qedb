import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useTranslate } from 'react-admin';


const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
  },
  cost: {
    marginRight: '1em',
    color: theme.palette.text.primary,
  },
}));

const PendingOrders = (props) => {
  const { orders = [], customers = {} } = props;
  const classes = useStyles();
  const translate = useTranslate();
  return (
    <Card className={classes.root}>
      <CardHeader title={'Pending posts'} />
      <List dense={true}>
        {orders.map((record) => (
          <ListItem
            key={record.id}
            button
            component={Link}
            to={`/users/${record.id}`}
          >
            <ListItemAvatar>
              {customers[record.author.id] ? (
                <Avatar
                  src={`${
                    customers[record.author.id].avatar ||
                    'https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_960_720.png'
                  }?size=32x32`}
                />
              ) : (
                <Avatar />
              )}
            </ListItemAvatar>
            <ListItemText
              primary={new Date(record.createdAt).toLocaleString('en-GB')}
              // secondary={translate('pos.dashboard.order.items', {
              //   smart_count: record.basket.length,
              //   nb_items: record.basket.length,
              //   customer_name: customers[record.customer_id]
              //     ? `${customers[record.customer_id].first_name} ${
              //         customers[record.customer_id].last_name
              //       }`
              //     : '',
              // })}
            />
            <ListItemSecondaryAction>
              <span className={classes.cost}>{record.total}$</span>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default PendingOrders;
