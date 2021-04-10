import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { loadPersistedState } from '../persist';
import {
  setError,
  setAccessToken,
  setRefreshToken,
  logoutThunk,
  authenticateThunk,
} from './actions';
import { AuthState } from './types';

const initialState: AuthState = {
  accessToken: undefined,
  error: undefined,
  refreshToken: undefined,
};

export default createReducer<AuthState>(initialState, (builder) =>
  builder
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setAccessToken, (state, action) => {
      state.accessToken = action.payload;
    })
    .addCase(setRefreshToken, (state, action) => {
      state.refreshToken = action.payload;
    })
    .addCase(logoutThunk.fulfilled, (state) => {
      state.accessToken = undefined;
      state.refreshToken = undefined;
    })
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
    )
);
