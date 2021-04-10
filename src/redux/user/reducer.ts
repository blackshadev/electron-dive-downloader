import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { IUserData } from '../../services/userInfo';
import { getUserInfoThunk } from './actions';
import { UserState } from './types';

const initialState = {
  userData: undefined,
};

export default createReducer<UserState>(initialState, (builder) =>
  builder.addCase(
    getUserInfoThunk.fulfilled,
    (state, action: PayloadAction<IUserData>) => {
      state.userData = action.payload;
    }
  )
);
