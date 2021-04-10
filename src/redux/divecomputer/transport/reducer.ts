import { createReducer } from '@reduxjs/toolkit';
import { Transport } from 'libdivecomputerjs';
import {
  getTransportSources,
  setTransportSource,
  setTransportType,
} from './actions';
import { TransportState } from './types';

const intialState: TransportState = {
  availableTransports: [],
  transport: undefined,
  type: Transport.None,
};

export default createReducer<TransportState>(intialState, (builder) =>
  builder
    .addCase(setTransportType, (state, action) => {
      state.type = action.payload;
    })
    .addCase(setTransportSource, (state, action) => {})
    .addCase(getTransportSources.fulfilled, (state, action) => {
      state.availableTransports = action.payload;
    })
);
