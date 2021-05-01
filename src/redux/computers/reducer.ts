import { createReducer } from '@reduxjs/toolkit';
import { resetComputers, selectComputer, setComputers } from './actions';
import { ComputerState } from './types';

const initialState = {
  computers: undefined,
} as ComputerState;

export default createReducer<ComputerState>(initialState, (builder) =>
  builder
    .addCase(resetComputers, (state) => {
      state.computers = undefined;
      state.selectedComputer = undefined;
    })
    .addCase(setComputers, (state, action) => {
      state.computers = action.payload;
    })
    .addCase(selectComputer, (state, action) => {
      state.selectedComputer = action.payload;
    })
);
