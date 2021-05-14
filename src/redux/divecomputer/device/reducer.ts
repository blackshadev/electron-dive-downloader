import { createReducer } from '@reduxjs/toolkit';
import { setReadProgress, setDeviceState, receivedDeviceInfo } from './actions';
import { DeviceState } from './types';

const intialState: DeviceState = {
  progress: { current: 0, maximum: 0 },
  device: undefined,
  state: 'none',
};

export default createReducer<DeviceState>(intialState, (builder) =>
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
    .addCase(setDeviceState, (state, action) => {
      state.state = action.payload;
    })
);
