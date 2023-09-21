import createSagaMiddleware from '@redux-saga/core';
import {all, fork} from 'redux-saga/effects';

import {bluetoothSaga} from './ducks/bluetooth/bluetooth.saga';

export const sagaMiddleware = createSagaMiddleware();

// Initiate the root saga
const rootSaga = function* rootSaga() {
  yield all([fork(bluetoothSaga)]);
};

export default rootSaga;
