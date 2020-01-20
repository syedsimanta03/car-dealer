import React from 'react';
import { Query } from 'react-apollo';
import { GET_CURRENT_USER } from '../queries';
import { Redirect } from 'react-router-dom';

// SO if there is any user loggedin return component that user asked for, otherwise redirect to home/
const withAuth = conditionFunc => Component => props => (
  <Query query={GET_CURRENT_USER}>
    {({ data, loading }) => {
      if (loading) return null;

      return conditionFunc(data) ? (
        <Component {...props} />
      ) : (
        <Redirect to='/' />
      );
    }}
  </Query>
);

export default withAuth;
