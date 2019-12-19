import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from '../history/history';
import MenuWrapper from '../common/components/menuWrapper/MenuWrapper';
import SellPage from '../pages/sellPage/SellPage';

const AppRouter = () => (
  <Router history={history}>
    <MenuWrapper >
      <Switch>
        <Route path="/" exact component={SellPage} />
      </Switch>
    </MenuWrapper>
  </Router>
);

export default AppRouter;