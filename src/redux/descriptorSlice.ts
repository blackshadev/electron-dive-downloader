import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Descriptor } from 'libdivecomputerjs';
import { loadPersistedState } from './persist';

export const descriptorName = (descriptor: Descriptor) =>
  `${descriptor.vendor} ${descriptor.product}`;

export const descriptorId = (descriptor: Descriptor) =>
  `${descriptor.vendor}:${descriptor.product}:${descriptor.model}`;

export const compareDescriptor = (a: Descriptor, b: Descriptor) =>
  descriptorName(a).localeCompare(descriptorName(b));

const initialState = {
  all: [] as Descriptor[],
  selected: undefined as string | undefined,
};
type State = typeof initialState;

const descriptorSlice = createSlice({
  name: 'descriptors',
  initialState,
  reducers: {
    setDescriptors: (state: State, action: PayloadAction<Descriptor[]>) => {
      state.all = action.payload;
    },
    selectDescriptor: (state: State, action: PayloadAction<string>) => {
      const foundDescriptor = state.all.find(
        (descriptor) => descriptorId(descriptor) === action.payload
      );

      if (foundDescriptor === undefined) {
        state.selected = undefined;
      } else {
        state.selected = action.payload;
      }
    },
  },
  extraReducers: {
    [loadPersistedState.type]: (
      state,
      action: PayloadAction<{ descriptors?: { selected: string } }>
    ) => {
      state.selected = action.payload.descriptors?.selected;
    },
  },
});

export const { setDescriptors, selectDescriptor } = descriptorSlice.actions;

export const allDescriptorsSelector = (state: { descriptors: State }) =>
  state.descriptors.all.slice().sort(compareDescriptor);

export const selectedDescriptor = (state: { descriptors: State }) =>
  state.descriptors.all.find(
    (descriptor) => state.descriptors.selected === descriptorId(descriptor)
  );

export const supportedTransports = createSelector(
  selectedDescriptor,
  (state) => state?.transports ?? []
);

export const serializableSelector = (state: { descriptors: State }) => ({
  descriptors: { selected: state.descriptors.selected },
});

export default descriptorSlice.reducer;
