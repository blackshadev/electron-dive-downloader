import { createReducer } from '@reduxjs/toolkit';
import { persistedStateLoaded } from './actions';
import { PersistanceState } from './types';

const initialState = {
  isLoaded: false,
} as PersistanceState;

export default createReducer<PersistanceState>(initialState, (builder) =>
  builder.addCase(persistedStateLoaded, (state) => {
    state.isLoaded = true;
  })
);
