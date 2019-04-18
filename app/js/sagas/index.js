import { sagas as openmrsSagas } from '@openmrs/react-components';
import orderSaga from './orderSaga';

const sagas = {
  openmrsSagas,
  orderSaga,
};

const initSagas = (sagaMiddleware) => {
  Object.values(sagas).forEach(sagaMiddleware.run.bind(sagaMiddleware));
};

export default initSagas;