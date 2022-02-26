import * as React from 'react';
import inflection from 'inflection';
import { Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LocalOfferIcon from '@material-ui/icons/LocalOfferOutlined';
import BarChartIcon from '@material-ui/icons/BarChart';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import {
  FilterList,
  FilterListItem,
  FilterLiveSearch,
  useGetList,
} from 'react-admin';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      width: '15em',
      marginRight: '1em',
      overflow: 'initial',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

const Aside = () => {
  const { data, ids } = useGetList(
    'categories',
    { page: 1, perPage: 100 },
    { field: 'name', order: 'ASC' },
    {}
  );
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <FilterLiveSearch source='title' />

        <FilterList label='Sales' icon={<AttachMoneyIcon />}>
          <FilterListItem
            label='Sold before'
            value={{
              soldBefore: 1,
            }}
          />
          <FilterListItem
            label='Never sold'
            value={{
              sales: 0,
            }}
          />
        </FilterList>

        <FilterList label='Stock' icon={<BarChartIcon />}>
          <FilterListItem
            label='Out of stock'
            value={{
              stock_lt: undefined,
              stock_gt: undefined,
              stock: 0,
            }}
          />
          <FilterListItem
            label='1 - 9 items'
            value={{
              stock_lt: 10,
              stock_gt: 0,
              stock: undefined,
            }}
          />
          <FilterListItem
            label='10 - 49 items'
            value={{
              stock_lt: 50,
              stock_gt: 9,
              stock: undefined,
            }}
          />
          <FilterListItem
            label='50 items and more'
            value={{
              stock_lt: undefined,
              stock_gt: 49,
              stock: undefined,
            }}
          />
        </FilterList>

        <FilterList label='Categories' icon={<LocalOfferIcon />}>
          {ids &&
            data &&
            ids.map((id) => (
              <FilterListItem
                label={inflection.humanize(data[id].name)}
                key={data[id].id}
                value={{ category: data[id].id }}
              />
            ))}
        </FilterList>
      </CardContent>
    </Card>
  );
};

export default Aside;
