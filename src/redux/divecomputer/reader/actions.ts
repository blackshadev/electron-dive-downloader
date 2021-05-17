import { createAction } from '@reduxjs/toolkit';
import { DeviceInfo, Progress, ReadingState } from './types';

export const setReadProgress = createAction<Progress>('reader.setProgress');
export const setReaderState = createAction<ReadingState>('reader.setState');
export const receivedDeviceInfo = createAction<DeviceInfo>(
  'reader.receivedDeviceInfo'
);
export const setDeviceError = createAction<string>('reader.error');
export const resetDeviceError = createAction('reader.resetError');
export const readStart = createAction('reader.readStart');
export const setNewDivesOnly = createAction<boolean>('reader.setNewDivesOnly');
