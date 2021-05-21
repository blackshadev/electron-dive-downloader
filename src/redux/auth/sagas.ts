import { PayloadAction } from '@reduxjs/toolkit';
import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import {
  authenticate,
  loggedin,
  loggedout,
  logout,
  setAccessToken,
  setError,
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
import userReadableError from '../../services/userReadableError';

export function* authenticateSaga(
  action: PayloadAction<ICredentials>
): SagaIterator {
  try {
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
  } catch (error) {
    console.log(userReadableError(error));
    yield put(setError(userReadableError(error)));
  }
}

export function* logoutSaga(): SagaIterator {
  const accessToken: string = yield select(getAccessToken);
  try {
    yield call(logoutApi, accessToken);
  } catch (err) {
    console.error(err);
  }
  yield put(loggedout());
}

export function* authenticateWithRefreshTokenSage(): SagaIterator {
  const refreshToken = select(getRefreshToken);
  if (!refreshToken) {
    return;
  }

  try {
    yield call(requestAccessTokenSaga);
    yield put(loggedin());
  } catch (err) {
    console.error(err);
  }
}

export function* loadAuthState(
  action: PayloadAction<{
    auth?: { accessToken: string; refreshToken: string };
  }>
): SagaIterator {
  if (!action.payload.auth) {
    return;
  }
  try {
    yield put(setAccessToken(action.payload.auth.accessToken));
    yield put(setRefreshToken(action.payload.auth.refreshToken));
    yield call(authenticateWithRefreshTokenSage);
  } catch (error) {
    console.error(err);
  }
}

export default function* authenticationSaga(): SagaIterator {
  yield takeLatest(authenticate, authenticateSaga);
  yield takeLatest(logout, logoutSaga);
  yield takeLatest(loadPersistedState, loadAuthState);
  yield takeLatest(tryToken, authenticateWithRefreshTokenSage);
}
