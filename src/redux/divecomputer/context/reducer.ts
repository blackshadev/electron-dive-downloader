import { createReducer } from '@reduxjs/toolkit';
import { setContextState } from './actions';
import { ContextState } from './types';

const initialState = {
  loglines: [],
  state: 'uninitialized',
} as ContextState;

export default createReducer<ContextState>(initialState, (builder) =>
  builder.addCase(setContextState, (state, action) => {
    state.state = action.payload;
  })
);
