import { createAction } from '@reduxjs/toolkit';
import { LogLevel, LogLine } from './types';

export type LogInput = Omit<LogLine, 'key'>;
export type ErrorInput = Omit<LogInput, 'loglevel'>;

export const setLogLevel = createAction<LogLevel>('logging.setLogLevel');
export const log = createAction<LogInput>('logging.log');
export const error = createAction<ErrorInput>('logging.error');
export const dismissError = createAction<string>('logging.dismissError');
