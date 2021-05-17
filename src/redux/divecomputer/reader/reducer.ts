import { createReducer } from '@reduxjs/toolkit';
import {
  setReadProgress,
  setReaderState,
  receivedDeviceInfo,
  setDeviceError,
  resetDeviceError,
  setNewDivesOnly,
} from './actions';
import { ReaderState } from './types';

const intialState: ReaderState = {
  progress: { current: 0, maximum: 0 },
  device: undefined,
  state: 'none',
  error: undefined,
  newDivesOnly: true,
};

export default createReducer<ReaderState>(intialState, (builder) =>
  builder
    .addCase(setReadProgress, (state, action) => {
      state.progress = {
        current: action.payload.current,
        maximum: action.payload.maximum,
      };
    })
    .addCase(receivedDeviceInfo, (state, action) => {
      state.deviceInfo = action.payload;
    })
    .addCase(setReaderState, (state, action) => {
      state.state = action.payload;
    })
    .addCase(setDeviceError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(resetDeviceError, (state) => {
      state.error = undefined;
    })
    .addCase(setNewDivesOnly, (state, action) => {
      state.newDivesOnly = action.payload;
    })
);
