import { createAction } from '@reduxjs/toolkit';
import { IUserData } from '../../services/api/auth/userInfo';

export const resetUserData = createAction('resetUserData');
export const setUserData = createAction<IUserData>('setUserData');
