import { createReducer } from '@reduxjs/toolkit';
import { Context } from 'libdivecomputerjs';
import { addLog, setLogLevel, setContextState } from './actions';
import { ContextState } from './types';

const initialState = {
  loglines: [],
  state: 'uninitialized',
  context: new Context(),
} as ContextState;

export default createReducer<ContextState>(initialState, (builder) =>
  builder
    .addCase(addLog, (state, action) => {
      state.loglines = [...state.loglines, action.payload];
    })
    .addCase(setLogLevel, (state, action) => {
      state.context.logLevel = action.payload;
    })
    .addCase(setContextState, (state, action) => {
      state.state = action.payload;
    })
);
