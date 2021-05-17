import { createSelector } from 'reselect';
import { ReaderState } from './types';

export const getState = (state: { reader: ReaderState }) => state.reader.state;

export const getNewDivesOnly = (state: { reader: ReaderState }) =>
  state.reader.newDivesOnly;

export const getProgress = (state: { reader: ReaderState }) =>
  state.reader.progress;

export const getDevice = (state: { reader: ReaderState }) =>
  state.reader.device;

export const getDeviceInfo = (state: { reader: ReaderState }) =>
  state.reader.deviceInfo;

export const getDeviceError = (state: { reader: ReaderState }) =>
  state.reader.error;

export const isCancelled = createSelector(
  getState,
  (state) => state === 'cancelled'
);

export const isReading = createSelector(
  getState,
  (state) => state === 'reading'
);
