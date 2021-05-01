import { PayloadAction } from '@reduxjs/toolkit';
import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import {
  authenticate,
  loggedin,
  loggedout,
  logout,
  setAccessToken,
  setRefreshToken,
} from './actions';
import {
  authenticate as authenicateApi,
  logout as logoutApi,
} from '../../services/auth/authentication';
import { ICredentials } from './types';
import { getAccessToken } from './selectors';

export function* authenticateSaga(
  action: PayloadAction<ICredentials>
): SagaIterator {
  const {
    refresh_token: refreshToken,
    access_token: accessToken,
  }: { refresh_token: string; access_token: string } = yield call(
    authenicateApi,
    action.payload
  );

  yield put(setAccessToken(accessToken));
  yield put(setRefreshToken(refreshToken));
  yield put(loggedin());
}

export function* logoutSaga(): SagaIterator {
  const accessToken: string = yield select(getAccessToken);
  yield call(logoutApi, accessToken);
  yield put(loggedout());
}

export function* loadAuthState(
  action: PayloadAction<{
    auth?: { accessToken: string; refreshToken: string };
  }>
): SagaIterator {
  if (!action.payload.auth) {
    return;
  }
  yield put(setAccessToken(action.payload.auth.accessToken));
  yield put(setRefreshToken(action.payload.auth.refreshToken));
  yield put(loggedin());
}

export default function* authenticationSaga(): SagaIterator {
  yield takeLatest(authenticate, authenticateSaga);
  yield takeLatest(logout, logoutSaga);
  yield takeLatest(loadPersistedState, loadAuthState);
}
