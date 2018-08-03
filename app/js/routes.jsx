/* * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header } from '@openmrs/react-components';
import OrderEntryPage from './components/orderEntry/OrderEntryPage';

const Routes = store => (
  <div>
    <Header />
    <Switch>
      <Route path="/" component={OrderEntryPage} />
    </Switch>
  </div>
);

export default Routes;
