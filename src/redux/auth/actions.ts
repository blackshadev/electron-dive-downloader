import { createAction } from '@reduxjs/toolkit';
import { ICredentials } from './types';

export const tryToken = createAction('tryToken');
export const setAccessToken = createAction<string>('setAccessToken');
export const setRefreshToken = createAction<string>('setRefreshToken');
export const authenticate = createAction<ICredentials>('authenticate');
export const loggedin = createAction('loggedin');
export const logout = createAction('logout');
export const loggedout = createAction('loggedout');
