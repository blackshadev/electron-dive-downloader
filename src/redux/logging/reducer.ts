import { createReducer } from '@reduxjs/toolkit';
import { dismissError, error, log, setLogLevel } from './actions';
import { LoggingState, LogLevel, LogLine } from './types';

const initialState = {
  loglines: [] as LogLine[],
  loglevel: LogLevel.Warning,
  errors: [] as LogLine[],
} as LoggingState;

let iCounter = 0;
const COUNTER_MAX = Number.MAX_SAFE_INTEGER;
function generateKey() {
  iCounter = (iCounter + 1) % COUNTER_MAX;
  return `${Date.now()}:${iCounter}`;
}

export default createReducer<LoggingState>(initialState, (builder) =>
  builder
    .addCase(setLogLevel, (state, action) => {
      state.loglevel = action.payload;
    })
    .addCase(log, (state, action) => {
      if (state.loglevel < action.payload.loglevel) {
        return;
      }

      const logline: LogLine = { ...action.payload, key: generateKey() };
      state.loglines = [...state.loglines, logline];
    })
    .addCase(error, (state, action) => {
      state.errors = [
        ...state.errors,
        { ...action.payload, key: generateKey(), loglevel: LogLevel.Error },
      ];
    })
    .addCase(dismissError, (state, action) => {
      state.errors = state.errors.filter((err) => err.key !== action.payload);
    })
);
