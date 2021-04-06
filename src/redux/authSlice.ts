import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  authenticate as requestAuthentication,
  requestAccessToken,
} from '../services/authentication';
import { loadPersistedState } from './persist';

const initialState = {
  error: undefined as string | undefined,
  refreshToken: undefined as string | undefined,
  accessToken: undefined as string | undefined,
};
type State = typeof initialState;

interface AuthenticateParameters {
  email: string;
  password: string;
}
/* eslint-disable @typescript-eslint/no-use-before-define */
export const authenticateThunk = createAsyncThunk(
  'authenticate',
  async (oPar: AuthenticateParameters, thunkApi) => {
    const tokens = await requestAuthentication(oPar);
    thunkApi.dispatch(authSlice.actions.setRefreshToken(tokens.refresh_token));
    thunkApi.dispatch(authSlice.actions.setAccessToken(tokens.access_token));
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setError: (state: State, action: PayloadAction<undefined | string>) => {
      state.error = action.payload;
    },
    setAccessToken: (state: State, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state: State, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateThunk.pending, (state) => {
        state.error = undefined;
      })
      .addCase(authenticateThunk.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(
        loadPersistedState.type,
        (
          state,
          action: PayloadAction<{
            auth?: { accessToken: string; refreshToken: string };
          }>
        ) => {
          state.accessToken = action.payload.auth?.accessToken;
          state.refreshToken = action.payload.auth?.refreshToken;
        }
      );
  },
});

export const refreshAccessTokenThunk = createAsyncThunk(
  'refreshAccessToken',
  async (refresh: string, thunkApi) => {
    const token = await requestAccessToken(refresh);
    thunkApi.dispatch(authSlice.actions.setAccessToken(token.access_token));
  }
);

export async function withAccessToken<T>(
  getTokens: () => { refreshToken?: string; accessToken?: string },
  requestFn: (token: string) => Promise<T>,
  tokenFn: (token: string) => void
) {
  try {
    const { accessToken } = getTokens();
    return await requestFn(accessToken!);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      const { refreshToken } = getTokens();
      const newToken = await requestAccessToken(refreshToken!);
      tokenFn(newToken.access_token);
      return requestFn(newToken.access_token);
    }

    throw error;
  }
}

export const serializableAuthSelector = (state: { auth: State }) => ({
  auth: {
    refreshToken: state.auth.refreshToken,
    accessToken: state.auth.accessToken,
  },
});

export const errorSelector = (state: { auth: State }) => state.auth.error;
export const isLoggedInSelector = (state: { auth: State }) =>
  !!state.auth.refreshToken;
export const getAccessToken = (state: { auth: State }) =>
  state.auth.accessToken;
export const getTokens = (state: { auth: State }) => ({
  accessToken: state.auth.accessToken,
  refreshToken: state.auth.refreshToken,
});

export const { setError, setAccessToken, setRefreshToken } = authSlice.actions;
export {
  authenticateThunk as authenticate,
  refreshAccessTokenThunk as refreshAccessToken,
};
export type AuthState = State;
export default authSlice.reducer;
