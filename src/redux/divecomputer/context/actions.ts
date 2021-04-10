import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { LogLevel } from 'libdivecomputerjs';
import { getContext } from './selectors';
import { ContextState, LogLine } from './types';

export const setState = createAction<'ready' | 'uninitialized'>('setState');
export const addLog = createAction<LogLine>('addLog');
export const setLogLevel = createAction<LogLevel>('setLogLevel');

export const initializeContext = createAsyncThunk<
  void,
  void,
  { state: { context: ContextState } }
>('createContext', async (_, thunkApi) => {
  const context = getContext(thunkApi.getState());
  context.onLog((logLevel: LogLevel, message: string) => {
    const rnd = Math.floor(Math.random() * 255);
    const key = `${Date.now()}:${rnd}`;

    thunkApi.dispatch(addLog({ key, logLevel, message }));
  });
  thunkApi.dispatch(setState('ready'));
});
