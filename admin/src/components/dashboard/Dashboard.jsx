import React, { useState, useEffect, useCallback, CSSProperties } from 'react';
import { useVersion, useDataProvider } from 'react-admin';
import { useMediaQuery, Theme } from '@material-ui/core';
import { subDays } from 'date-fns';

import Welcome from './Welcome';
import MonthlyPosts from './MonthlyPosts';
import PendingPosts from './PendingPosts';
import NewUsers from './NewUsers';
import OrderChart from './OrderChart';

const styles = {
  flex: { display: 'flex' },
  flexColumn: { display: 'flex', flexDirection: 'column' },
  leftCol: { flex: 1, marginRight: '0.5em' },
  rightCol: { flex: 1, marginLeft: '0.5em' },
  singleCol: { marginTop: '1em', marginBottom: '1em' },
};

const Spacer = () => <span style={{ width: '1em' }} />;
const VerticalSpacer = () => <span style={{ height: '1em' }} />;

const Dashboard = () => {
  const [state, setState] = useState({});
  const version = useVersion();
  const dataProvider = useDataProvider();
  const isXSmall = useMediaQuery((theme) => theme.breakpoints.down('xs'));
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const fetchQuestions = useCallback(async () => {
    const aMonthAgo = subDays(new Date(), 30);
    const { data: recentQuestions } = await dataProvider.getList('questions', {
      filter: { createdAt: { gte: aMonthAgo.toISOString() } },
      sort: { field: 'createdAt', order: 'DESC' },
      pagination: { page: 1, perPage: 100 },
    });

    const aggregations = recentQuestions.reduce(
      (stats, question) => {
        if (question.status === 'approved') {
          stats.approved = stats.approved + 1;
        }
        if (question.status === 'pending') {
          stats.pending.push(question);
        }

        return stats;
      },
      {
        approved: 0,
        pending: [],
      }
    );
    setState((state) => ({
      ...state,
      recentQuestions,
      approvedPosts: aggregations.approved,
      pendingPosts: aggregations.pending,
    }));

    // const { data: users } = await dataProvider.getMany('users', {
    //   ids: aggregations.pending.map((question) => question.author.id),
    // });
    setState((state) => ({
      ...state,
      // pendingQuestionsUsers: users.reduce((prev, customer) => {
      //   prev[customer.id] = customer; // eslint-disable-line no-param-reassign
      //   return prev;
      // }, {}),
    }));
  }, [dataProvider]);

  // const fetchReviews = useCallback(async () => {
  //   const { data: reviews } = await dataProvider.getList('reviews', {
  //     filter: { status: 'pending' },
  //     sort: { field: 'date', order: 'DESC' },
  //     pagination: { page: 1, perPage: 100 },
  //   });
  //   const nbPendingReviews = reviews.reduce((nb) => ++nb, 0);
  //   const pendingReviews = reviews.slice(0, Math.min(10, reviews.length));
  //   setState((state) => ({ ...state, pendingReviews, nbPendingReviews }));
  //   const { data: customers } = await dataProvider.getMany('customers', {
  //     ids: pendingReviews.map((review) => review.customer_id),
  //   });
  //   setState((state) => ({
  //     ...state,
  //     pendingReviewsCustomers: customers.reduce((prev, customer) => {
  //       prev[customer.id] = customer; // eslint-disable-line no-param-reassign
  //       return prev;
  //     }, {}),
  //   }));
  // }, [dataProvider]);

  useEffect(() => {
    fetchQuestions();
    // fetchReviews();
  }, [version]); // eslint-disable-line react-hooks/exhaustive-deps

  const {
    pendingPosts,
    // pendingQuestionsUsers,

    approvedPosts,
    recentQuestions,
  } = state;
  return isXSmall ? (
    <div>
      <div style={styles.flexColumn}>
        <Welcome />
        <MonthlyPosts value={approvedPosts} />
        <VerticalSpacer />

        <VerticalSpacer />
        {/* <PendingPosts
          orders={pendingPosts}
          customers={pendingQuestionsUsers}
        /> */}
        <NewUsers />
      </div>
    </div>
  ) : isSmall ? (
    <div style={styles.flexColumn}>
      <div style={styles.singleCol}>
        <Welcome />
      </div>
      <div style={styles.flex}>
        <MonthlyPosts value={approvedPosts} />
        <Spacer />
      </div>
      {/* <div style={styles.singleCol}> */}
      {/* <OrderChart orders={recentQuestions} /> */}
      {/* </div> */}
      <div style={styles.singleCol}>
        {/* <PendingPosts
          orders={pendingPosts}
          customers={pendingQuestionsUsers}
        /> */}
        <NewUsers />
      </div>
    </div>
  ) : (
    <>
      <Welcome />
      <div style={styles.flex}>
        <div style={styles.leftCol}>
          <div style={styles.flex}>
            {/* <MonthlyPosts value={approvedPosts} /> */}
            <NewUsers />

            <Spacer />
          </div>
          {/* <div style={styles.singleCol}> */}
          {/* <OrderChart orders={recentQuestions} /> */}
          {/* </div> */}
          <div style={styles.singleCol}>
            {/* <PendingPosts
              orders={pendingPosts}
              customers={pendingQuestionsUsers}
            /> */}
          </div>
        </div>
        <div style={styles.rightCol}>
          <div style={styles.flex}>
            <Spacer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
