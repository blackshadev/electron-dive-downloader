import { createAsyncThunk } from '@reduxjs/toolkit';
import handleAxiosError from '../../services/axiosErrorHandling';
import { IUserData, userInfo } from '../../services/auth/userInfo';
import withAccessToken from '../../services/auth/withAccessTokens';
import { AuthState, getTokens, setAccessToken } from '../auth';

export const getUserInfoThunk = createAsyncThunk<
  IUserData,
  void,
  { state: { auth: AuthState } }
>('getUserInfo', async (_, thunk) => {
  return handleAxiosError(() =>
    withAccessToken(
      () => getTokens(thunk.getState()),
      (accessToken) => userInfo(accessToken),
      (token: string) => thunk.dispatch(setAccessToken(token))
    )
  );
});

export default getUserInfoThunk;
