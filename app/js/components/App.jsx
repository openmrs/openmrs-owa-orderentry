import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import OrderEntryPage from './orderEntry/OrderEntryPage';

const App = () => (
  <Router>
    <div id="wrap">
      <Switch>
        <Route
          path="/"
          component={OrderEntryPage}
        />
      </Switch>
    </div>
  </Router>
);

export default App
