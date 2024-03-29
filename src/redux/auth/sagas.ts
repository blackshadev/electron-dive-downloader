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
  tryToken,
} from './actions';
import {
  authenticate as authenicateApi,
  logout as logoutApi,
} from '../../services/api/auth/authentication';
import { ICredentials } from './types';
import { getAccessToken, getRefreshToken } from './selectors';
import { loadPersistedState } from '../persistence';
import { requestAccessTokenSaga } from './withAccessTokenSaga';
import withErrorHandling from '../error/withErrorHandler';

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

export function* authenticateWithRefreshTokenSage(): SagaIterator {
  const refreshToken = select(getRefreshToken);
  if (!refreshToken) {
    return;
  }

  yield call(requestAccessTokenSaga);
  yield put(loggedin());
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
  yield call(authenticateWithRefreshTokenSage);
}

export default function* authenticationSaga(): SagaIterator {
  yield takeLatest(authenticate, withErrorHandling(authenticateSaga, 'auth'));
  yield takeLatest(logout, withErrorHandling(logoutSaga, 'auth'));
  yield takeLatest(
    loadPersistedState,
    withErrorHandling(loadAuthState, 'auth')
  );
  yield takeLatest(
    tryToken,
    withErrorHandling(authenticateWithRefreshTokenSage, 'auth')
  );
}
