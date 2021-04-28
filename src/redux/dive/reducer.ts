import { createReducer } from '@reduxjs/toolkit';
import { DiveState } from './types';

const initialState = {
  dives: [],
} as DiveState;

export default createReducer<DiveState>(initialState, (builder) => builder);
