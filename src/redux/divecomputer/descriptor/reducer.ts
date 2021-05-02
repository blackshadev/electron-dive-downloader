import { createReducer } from '@reduxjs/toolkit';
import { selectDescriptor, setDescriptors } from './actions';
import { DescriptorState } from './types';

const initialState: DescriptorState = {
  all: [],
  selected: undefined,
};

export default createReducer<DescriptorState>(initialState, (builder) =>
  builder
    .addCase(setDescriptors, (state, action) => {
      state.all = action.payload;
    })
    .addCase(selectDescriptor, (state, action) => {
      state.selected = action.payload;
    })
);
