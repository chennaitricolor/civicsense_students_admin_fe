import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../utils/history';
import Loadable from 'react-loadable';
import LoadingComponent from '../components/LoadingComponent';
import App from '../App';

const AsyncLogin = Loadable({
  loader: () => import('../containers/LoginContainer'),
  loading: LoadingComponent,
});

const AsyncHome = Loadable({
  loader: () => import('../App'),
  loading: LoadingComponent,
});

export default props => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={AsyncLogin} />
      <Route exact path="/home" component={AsyncHome} />
    </Switch>
  </Router>
);