import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { IUserData } from '../../services/auth/userInfo';
import { resetUserData, setUserData } from './actions';
import { UserState } from './types';

const initialState = {
  userData: undefined,
};

export default createReducer<UserState>(initialState, (builder) =>
  builder
    .addCase(setUserData, (state, action: PayloadAction<IUserData>) => {
      state.userData = action.payload;
    })
    .addCase(resetUserData, (state) => {
      state.userData = undefined;
    })
);
