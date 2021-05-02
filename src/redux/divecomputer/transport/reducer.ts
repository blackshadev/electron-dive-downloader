import { createReducer } from '@reduxjs/toolkit';
import { Transport } from 'libdivecomputerjs';
import {
  setAvailableTransportSources,
  setSelectedTransportSource,
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
    .addCase(setSelectedTransportSource, (state, action) => {
      if (action.payload === undefined) {
        state.transport = undefined;
        return;
      }

      state.transport = state.availableTransports.find(
        (transport) => transport.key === action.payload
      );
    })
    .addCase(setAvailableTransportSources, (state, action) => {
      state.availableTransports = action.payload;
    })
);
