import { ContextState } from './types';

export const getContext = (state: { context: ContextState }) =>
  state.context.context;
export const getLogLevel = (state: { context: ContextState }) =>
  state.context.context.logLevel;
export const getLogLines = (state: { context: ContextState }) =>
  state.context.loglines;
