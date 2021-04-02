import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Descriptor } from 'libdivecomputerjs';

export const descriptorName = (descriptor: Descriptor) =>
  `${descriptor.vendor} ${descriptor.product}`;

export const descriptorId = (descriptor: Descriptor) =>
  `${descriptor.vendor}:${descriptor.product}:${descriptor.model}`;

export const compareDescriptor = (a: Descriptor, b: Descriptor) =>
  descriptorName(a).localeCompare(descriptorName(b));

const initialState = {
  all: [] as Descriptor[],
  selected: undefined as Descriptor | undefined,
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
      state.selected = foundDescriptor;
    },
  },
});

export const { setDescriptors, selectDescriptor } = descriptorSlice.actions;
export const allDescriptorsSelector = (state: { descriptors: State }) =>
  state.descriptors.all.slice().sort(compareDescriptor);

export const supportedTransports = (state: { descriptors: State }) =>
  state.descriptors.selected?.transports ?? [];

export default descriptorSlice.reducer;
