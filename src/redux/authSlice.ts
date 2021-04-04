import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authenticate as requestAuthentication } from '../services/authentication';
import loadPersistedState from './persist';

const initialState = {
  error: undefined as string | undefined,
  refreshToken: undefined as string | undefined,
  accessToken: undefined as string | undefined,
};
type State = typeof initialState;

interface AuthenticateParameters {
  email: string;
  password: string;
}

const authenticate = createAsyncThunk(
  'authenticate',
  async (oPar: AuthenticateParameters) => {
    console.log('here');
    return requestAuthentication(oPar);
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setError: (state: State, action: PayloadAction<undefined | string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticate.pending, (state) => {
        state.error = undefined;
      })
      .addCase(authenticate.rejected, (state, action) => {
        console.log('jere');
        state.error = action.error.message;
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
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
      );
  },
});

export const serializableAuthSelector = (state: { auth: State }) => ({
  auth: {
    refreshToken: state.auth.refreshToken,
    accessToken: state.auth.accessToken,
  },
});

export const errorSelector = (state: { auth: State }) => state.auth.error;

export const { setError } = authSlice.actions;
export { authenticate };
export default authSlice.reducer;
