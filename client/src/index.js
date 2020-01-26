import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import './index.css';

// Apollo Setup
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import withSession from './components/withSession';
// Components
import App from './App';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import Navbar from './components/Navbar';
import Footer from './components/Footer/Footer';
import Profile from './components/Profile/Profile';
import CarPage from './components/Car/CarPage';
import AddCar from './components/Car/AddCar';
import Search from './components/Search/Search';
import NotFound from './components/NotFound';

const client = new ApolloClient({
  // Pull data from the below uri
//uri: 'http://localhost:4444/graphql',
uri: 'https://automotive-app.herokuapp.com/graphql',
  // Send localstorage token to DB
  fetchOptions: {
    credentials: 'include'
  },
  // Get header for authorization that contains user token
  request: operation => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token
      }
    });
  },

  // Error handeling
  onError: ({ networkError }) => {
    if (networkError) {
      // If error set the token empty to sign out the user
      localStorage.setItem('token', '');
    }
  }
});

// Route setup
const Root = ({ refetch, session }) => (
  <Router>
    <Fragment>
      <Navbar session={session} />
      <Switch>
        <Route path='/' exact component={App} />
        <Route path='/search' component={Search} />
        <Route path='/signin' render={() => <Signin refetch={refetch} />} />
        <Route path='/signup' render={() => <Signup refetch={refetch} />} />
        <Route path='/car/add' render={() => <AddCar session={session} />} />
        <Route path='/profile' render={() => <Profile session={session} />} />
        <Route path='/cars/:_id' component={CarPage} />
        <Route path='*' component={NotFound} />
      </Switch>
      <Footer />
    </Fragment>
  </Router>
);

// Passing current user info to all component by HOC
const RootWithSession = withSession(Root);

ReactDOM.render(
  <ApolloProvider client={client}>
    <RootWithSession />
  </ApolloProvider>,
  document.getElementById('root')
);
