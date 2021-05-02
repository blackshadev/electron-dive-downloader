import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { loadPersistedState } from '../../persist';
import { selectDescriptor, setDescriptors } from './actions';
import { descriptorId } from './helpers';
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
      const foundDescriptor = state.all.find(
        (descriptor) => descriptorId(descriptor) === action.payload
      );

      if (foundDescriptor === undefined) {
        state.selected = undefined;
      } else {
        state.selected = action.payload;
      }
    })
    .addCase(
      loadPersistedState,
      (
        state,
        action: PayloadAction<{ descriptors?: { selected: string } }>
      ) => {
        state.selected = action.payload.descriptors?.selected;
      }
    )
);
