import { createAction } from '@reduxjs/toolkit';
import { Progress, ReadingState } from './types';

export const setReadProgress = createAction<Progress>('setProgress');
export const setDeviceState = createAction<ReadingState>('setState');
export const setFingerprint = createAction<string>('setFingerprint');
export const setDeviceSerial = createAction<string>('setDeviceSerial');
export const readStart = createAction('readStart');
