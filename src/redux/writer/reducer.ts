import { createReducer } from '@reduxjs/toolkit';
import { addDive } from '../dive';
import { readStart } from '../divecomputer/device';
import { setOutputType, written } from './actions';
import { WriterState } from './types';

const initialState = {
  outputType: 'file',
  pendingWrites: 0,
} as WriterState;

export default createReducer<WriterState>(initialState, (builder) =>
  builder
    .addCase(setOutputType, (state, action) => {
      state.outputType = action.payload;
    })
    .addCase(readStart, (state) => {
      state.pendingWrites = 0;
      state.isReading = true;
    })
    .addCase(addDive, (state) => {
      state.pendingWrites += 1;
    })
    .addCase(written, (state) => {
      state.pendingWrites -= 1;
    })
);
