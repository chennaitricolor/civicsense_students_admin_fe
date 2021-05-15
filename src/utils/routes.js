import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../utils/history';
import Loadable from 'react-loadable';
import LoadingComponent from '../components/LoadingComponent';

const AsyncLogin = Loadable({
  loader: () => import('../containers/LoginContainer'),
  loading: LoadingComponent,
});

const AsyncHome = Loadable({
  loader: () => import('../components/ReportEmbedComponent'),
  loading: LoadingComponent,
});

const AsyncHotZones = Loadable({
  loader: () => import('../containers/HotZonesContainer'),
  loading: LoadingComponent,
});

const AsyncTestingCenters = Loadable({
  loader: () => import('../containers/TestingCenterContainer'),
  loading: LoadingComponent,
});

const AsyncHealthCenters = Loadable({
  loader: () => import('../containers/HealthCenterContainer'),
  loading: LoadingComponent,
});

export default props => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={AsyncHome} />
      {/*<Route exact path="/dashboard" component={AsyncHome} />*/}
      {/*<Route exact path="/hotzones" component={AsyncHotZones} />*/}
      {/*<Route exact path="/containmentzones" component={AsyncHotZones} />*/}
      {/*<Route exact path="/testingCenters" component={AsyncTestingCenters} />*/}
      {/*<Route exact path="/healthCenters" component={AsyncHealthCenters} />*/}
    </Switch>
  </Router>
);
