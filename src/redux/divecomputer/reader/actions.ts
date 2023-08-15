import { createAction } from '@reduxjs/toolkit';
import { DeviceInfo, Progress } from './types';

export const setReadProgress = createAction<Progress>('reader.setProgress');
export const readerFinished = createAction('reader.finished');
export const readerStarted = createAction('reader.started');
export const readerErrored = createAction('reader.errored');
export const receivedDeviceInfo = createAction<DeviceInfo>(
  'reader.receivedDeviceInfo'
);
export const setDeviceError = createAction<string>('reader.error');
export const resetDeviceError = createAction('reader.resetError');
export const readStart = createAction('reader.readStart');
export const setNewDivesOnly = createAction<boolean>('reader.setNewDivesOnly');
