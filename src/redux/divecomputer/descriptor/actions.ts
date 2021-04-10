import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Descriptor } from 'libdivecomputerjs';

export const setDescriptors = createAction<Descriptor[]>('setDescriptors');
export const selectDescriptor = createAction<string>('selectDescriptor');

export const fetchDescriptors = createAsyncThunk<Descriptor[]>(
  'fetchDescriptors',
  () => {
    return Array.from(Descriptor.iterate());
  }
);
