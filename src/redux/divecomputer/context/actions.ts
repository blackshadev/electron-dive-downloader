import { createAction } from '@reduxjs/toolkit';
import { LogLevel } from 'libdivecomputerjs';
import { LogLine } from './types';

export const setContextState = createAction<'ready' | 'uninitialized'>(
  'setState'
);
export const addLog = createAction<LogLine>('addLog');
export const setLogLevel = createAction<LogLevel>('setLogLevel');
