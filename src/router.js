import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Progress from './pages/Progress';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Progress} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
