import { createAction } from '@reduxjs/toolkit';
import { IUserData } from '../../services/auth/userInfo';

export const resetUserData = createAction('resetUserData');
export const setUserData = createAction<IUserData>('setUserData');
