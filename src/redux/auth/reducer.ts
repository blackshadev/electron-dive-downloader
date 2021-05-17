import { createReducer } from '@reduxjs/toolkit';
import {
  setError,
  setAccessToken,
  setRefreshToken,
  loggedout,
  authenticate,
  loggedin,
} from './actions';
import { AuthState } from './types';

const initialState: AuthState = {
  accessToken: undefined,
  error: undefined,
  refreshToken: undefined,
  isLoggedIn: false,
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
    .addCase(loggedin, (state) => {
      state.isLoggedIn = true;
    })
    .addCase(loggedout, (state) => {
      state.accessToken = undefined;
      state.refreshToken = undefined;
      state.isLoggedIn = false;
    })
    .addCase(authenticate, (state) => {
      state.error = undefined;
    })
);
