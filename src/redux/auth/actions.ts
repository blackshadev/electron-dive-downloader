import { createAction } from '@reduxjs/toolkit';
import { ICredentials } from './types';

export const tryToken = createAction('tryToken');
export const setAccessToken = createAction<string>('setAccessToken');
export const setRefreshToken = createAction<string>('setRefreshToken');
export const setError = createAction<string>('setError');
export const authenticate = createAction<ICredentials>('authenticate');
export const loggedin = createAction('loggedin');
export const logout = createAction('logout');
export const loggedout = createAction('loggedout');

// export const refreshAccessTokenThunk = createAsyncThunk(
//   'refreshAccessToken',
//   async (refresh: string, thunkApi) => {
//     const token = await requestAccessToken(refresh);
//     thunkApi.dispatch(setAccessToken(token.access_token));
//   }
// );

// export const logoutThunk = createAsyncThunk<
//   void,
//   void,
//   { state: { auth: AuthState } }
// >('logout', async (_, thunkApi) => {
//   await handleAxiosError(() =>
//     withAccessToken(
//       () => getTokens(thunkApi.getState()),
//       (tok) => logoutApi(tok)
//     )
//   );
// });

// export const authenticateThunk = createAsyncThunk(
//   'authenticate',
//   async (oPar: AuthenticateParameters, thunkApi) => {
//     const tokens = await authenticate(oPar);
//     thunkApi.dispatch(setRefreshToken(tokens.refresh_token));
//     thunkApi.dispatch(setAccessToken(tokens.access_token));
//   }
// );
