import { SagaIterator } from 'redux-saga';
import { all, spawn } from 'redux-saga/effects';
import authenticationSaga from './auth/sagas';
import computerSagas from './computers/sagas';
import userSaga from './user/sagas';
import deviceSaga from './divecomputer/reader/sagas';
import contextSaga from './divecomputer/context/sagas';
import descriptorSagas from './divecomputer/descriptor/sagas';
import transportSagas from './divecomputer/transport/sagas';
import persistanceSagas from './persistence/sagas';
import writerSaga from './writer/sagas';
import { loggingSagas } from './logging/sagas';

export default function* rootSaga(): SagaIterator {
  yield all([
    spawn(computerSagas),
    spawn(userSaga),
    spawn(authenticationSaga),
    spawn(deviceSaga),
    spawn(contextSaga),
    spawn(descriptorSagas),
    spawn(transportSagas),
    spawn(writerSaga),
    spawn(persistanceSagas),
    spawn(loggingSagas),
  ]);
}
