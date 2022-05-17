import { call, select, put } from '@redux-saga/core/effects';
import { SagaIterator } from '@redux-saga/core';
import axios from 'axios';
import { requestAccessToken } from '../../services/api/auth/authentication';
import { setAccessToken } from './actions';
import { getAccessToken, getRefreshToken } from './selectors';

/* eslint-disable @typescript-eslint/no-explicit-any */
type InnerFunctionParams<
  T extends (accessToken: string, ...args: any[]) => any
> = T extends (accessToken: string, ...args: infer P) => any ? P : never;

export function* requestAccessTokenSaga(): SagaIterator<string> {
  const refreshToken: string = yield select(getRefreshToken);
  if (!refreshToken) {
    throw new Error('Unable request Access Token: No refresh token set');
  }
  const newToken: string = yield call(requestAccessToken, refreshToken);
  yield put(setAccessToken(newToken));
  return newToken;
}

export default function* withAccessToken<
  Fn extends (accessToken: string, ...args: any[]) => any
>(inner: Fn, ...fnArgs: InnerFunctionParams<Fn>): SagaIterator {
  /* eslint-enable @typescript-eslint/no-explicit-any */

  const currentAccessToken: string = yield select(getAccessToken);

  function getParameters(accessToken: string): Parameters<Fn> {
    return [accessToken, ...fnArgs] as unknown as Parameters<Fn>;
  }

  try {
    return yield call(inner, ...getParameters(currentAccessToken));
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      const refreshToken: string = yield select(getRefreshToken);
      if (!refreshToken) {
        throw new Error('No refresh token set');
      }

      const newToken: string = yield call(requestAccessTokenSaga);
      return yield call(inner, ...getParameters(newToken));
    }

    throw error;
  }
}

export function* execWithAccessToken(
  cb: (accessToken: string) => any
): SagaIterator {
  /* eslint-enable @typescript-eslint/no-explicit-any */

  const currentAccessToken: string = yield select(getAccessToken);
  try {
    return yield call(cb, currentAccessToken);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      const newToken: string = yield call(requestAccessTokenSaga);
      return yield call(cb, newToken);
    }

    throw error;
  }
}
