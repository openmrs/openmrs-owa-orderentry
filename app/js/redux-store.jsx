/* * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */

/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import promiseMiddleware from 'redux-promise-middleware';
import reducers from './reducers';
import errorMiddleware from './middlewares/errorMiddleware';
import responseHandlerMiddleware from './middlewares/responseHandlerMiddleware';
import initSagas from './sagas';

const promiseTypeSuffixes = ['LOADING', 'SUCCESS', 'FAILURE'];


const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  thunk,
  sagaMiddleware,
  errorMiddleware,
  promiseMiddleware({ promiseTypeSuffixes }),
  responseHandlerMiddleware,
];

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(createLogger({ collapsed: true }));
}

export default () => {
  const store = createStore(reducers, compose(
    applyMiddleware(...middlewares),
    window.devToolsExtension && process.env.NODE_ENV !== 'production'
      ? window.devToolsExtension() : f => f,
  ));
  initSagas(sagaMiddleware);
  return store;
};
