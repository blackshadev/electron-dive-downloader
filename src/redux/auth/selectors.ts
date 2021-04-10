import { AuthState, PersistedAuthState } from './types';

export const serializableAuthSelector = (state: { auth: AuthState }) =>
  ({
    accessToken: state.auth.accessToken,
    refreshToken: state.auth.refreshToken,
  } as PersistedAuthState);

export const errorSelector = (state: { auth: AuthState }) => state.auth.error;
export const isLoggedInSelector = (state: { auth: AuthState }) =>
  !!state.auth.refreshToken;
export const getAccessToken = (state: { auth: AuthState }) =>
  state.auth.accessToken;
export const getTokens = (state: { auth: AuthState }) => ({
  accessToken: state.auth.accessToken,
  refreshToken: state.auth.refreshToken,
});
