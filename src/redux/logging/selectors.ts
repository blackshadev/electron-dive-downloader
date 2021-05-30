import { LoggingState } from './types';

export const getLogLines = (state: { logging: LoggingState }) =>
  state.logging.loglines;

export const getLogLevel = (state: { logging: LoggingState }) =>
  state.logging.loglevel;

export const getErrors = (state: { logging: LoggingState }) =>
  state.logging.errors;
