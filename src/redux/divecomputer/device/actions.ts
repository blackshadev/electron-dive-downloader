import { createAction } from '@reduxjs/toolkit';
import { DeviceInfo, Progress, ReadingState } from './types';

export const setReadProgress = createAction<Progress>('device.setProgress');
export const setDeviceState = createAction<ReadingState>('device.setState');
export const receivedDeviceInfo = createAction<DeviceInfo>(
  'device.receivedDeviceInfo'
);
export const readStart = createAction('device.readStart');
