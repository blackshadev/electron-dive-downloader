import { createAction } from '@reduxjs/toolkit';
import { Descriptor } from 'libdivecomputerjs';

export const setDescriptors = createAction<Descriptor[]>('setDescriptors');
export const selectDescriptor = createAction<string>('selectDescriptor');
