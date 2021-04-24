import { createReducer } from '@reduxjs/toolkit';
import { Transport } from 'libdivecomputerjs';
import {
  getTransportSources,
  setTransportSource,
  setTransportType,
} from './actions';
import { TransportState } from './types';

const initialState: TransportState = {
  availableTransports: [],
  transport: undefined,
  type: Transport.None,
};

export default createReducer<TransportState>(initialState, (builder) =>
  builder
    .addCase(setTransportType, (state, action) => {
      state.type = action.payload;
    })
    .addCase(setTransportSource, (state, action) => {
      state.transport = state.availableTransports.find(
        (transport) => transport.key === action.payload
      );
    })
    .addCase(getTransportSources.fulfilled, (state, action) => {
      state.availableTransports = action.payload;
    })
);
