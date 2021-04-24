import { createSelector } from 'reselect';
import { DeviceState } from './types';

export const getState = (state: { device: DeviceState }) => state.device.state;

export const getProgress = (state: { device: DeviceState }) =>
  state.device.progress;

export const isCancelled = createSelector(
  getState,
  (state) => state === 'cancelled'
);

export const isReading = createSelector(
  getState,
  (state) => state === 'reading'
);
