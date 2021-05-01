import { SagaIterator } from 'redux-saga';
import { all, spawn } from 'redux-saga/effects';
import authenticationSaga from './auth/sagas';
import computerSagas from './computers/sagas';
import userSaga from './user/sagas';

export default function* rootSaga(): SagaIterator {
  yield all([spawn(computerSagas), spawn(userSaga), spawn(authenticationSaga)]);
}
