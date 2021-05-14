import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { getAccessToken, loggedin, loggedout } from '../auth';
import { resetUserData, setUserData } from './actions';
import { userInfoSelector } from './selectors';
import { IUserData, userInfo } from '../../services/api/auth/userInfo';
import withAccessToken from '../auth/withAccessTokenSaga';

export function* getUserDataSaga(): SagaIterator {
  const accesstoken: string = yield select(getAccessToken);
  const computers: undefined | IUserData[] = yield select(userInfoSelector);

  if (computers !== undefined) {
    return;
  }

  const userData: IUserData = yield call(
    withAccessToken,
    userInfo,
    accesstoken
  );

  yield put(setUserData(userData));
}

export function* resetUserDataSaga(): SagaIterator {
  yield put(resetUserData());
}

export default function* userSaga(): SagaIterator {
  yield takeLatest(loggedin, getUserDataSaga);
  yield takeLatest(loggedout, resetUserDataSaga);
}
