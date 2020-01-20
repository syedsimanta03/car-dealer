import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import Notiflix from 'notiflix-react';

// Init the module you want to use. e.g. Notify Module
Notiflix.Notify.Init({});

const handleSignout = (client, history) => {
  // clear local storage token
  localStorage.setItem('token', '');
  // Apollo client store reset->signout successfully
  client.resetStore();
  // Redirect to Home after Signout
  history.push('/');
  // Show notification
  Notiflix.Notify.Success('Logged Out');
};

const Signout = ({ history }) => (
  <ApolloConsumer>
    {client => {
      // console.log(client);
      return (
        <button className="signout" onClick={() => handleSignout(client, history)}>Signout</button>
      );
    }}
  </ApolloConsumer>
);

export default withRouter(Signout);
