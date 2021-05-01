import { AuthState, PersistedAuthState } from './types';

export const serializableAuthSelector = (state: { auth: AuthState }) =>
  ({
    auth:
      state.auth?.accessToken && state.auth?.refreshToken
        ? {
            accessToken: state.auth.accessToken,
            refreshToken: state.auth.refreshToken,
          }
        : undefined,
  } as PersistedAuthState);

export const errorSelector = (state: { auth: AuthState }) => state.auth.error;
export const isLoggedInSelector = (state: { auth: AuthState }) =>
  !!state.auth.refreshToken;
export const getAccessToken = (state: { auth: AuthState }) =>
  state.auth.accessToken;
export const getRefreshToken = (state: { auth: AuthState }) =>
  state.auth.refreshToken;
