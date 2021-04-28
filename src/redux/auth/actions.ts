import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  authenticate,
  AuthenticateParameters,
  logout,
  requestAccessToken,
} from '../../services/auth/authentication';
import handleAxiosError from '../../services/axiosErrorHandling';
import withAccessToken from '../../services/auth/withAccessTokens';
import { getTokens } from './selectors';
import { AuthState } from './types';

export const setAccessToken = createAction<string>('setAccessToken');
export const setRefreshToken = createAction<string>('setRefreshToken');
export const setError = createAction<string>('setError');

export const refreshAccessTokenThunk = createAsyncThunk(
  'refreshAccessToken',
  async (refresh: string, thunkApi) => {
    const token = await requestAccessToken(refresh);
    thunkApi.dispatch(setAccessToken(token.access_token));
  }
);

export const logoutThunk = createAsyncThunk<
  void,
  void,
  { state: { auth: AuthState } }
>('logout', async (_, thunkApi) => {
  await handleAxiosError(() =>
    withAccessToken(
      () => getTokens(thunkApi.getState()),
      (tok) => logout(tok)
    )
  );
});

export const authenticateThunk = createAsyncThunk(
  'authenticate',
  async (oPar: AuthenticateParameters, thunkApi) => {
    const tokens = await authenticate(oPar);
    thunkApi.dispatch(setRefreshToken(tokens.refresh_token));
    thunkApi.dispatch(setAccessToken(tokens.access_token));
  }
);
