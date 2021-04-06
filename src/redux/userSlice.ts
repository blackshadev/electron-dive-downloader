import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUserData, userInfo } from '../services/userInfo';
import {
  setAccessToken,
  getAccessToken,
  AuthState,
  withAccessToken,
  getTokens,
} from './authSlice';

const initialState = {
  userData: undefined as undefined | IUserData,
};
type State = typeof initialState;

export const getUserInfoThunk = createAsyncThunk<
  IUserData,
  void,
  { state: { auth: AuthState } }
>('getUserInfo', async (action, thunk) => {
  return withAccessToken(
    () => getTokens(thunk.getState()),
    userInfo,
    (token: string) => thunk.dispatch(setAccessToken(token))
  );
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserInfoThunk.fulfilled, (state, action) => {
      state.userData = action.payload;
    });
  },
});

export const userInfoSelector = (state: { user: State }) => state.user.userData;

export default userSlice.reducer;
