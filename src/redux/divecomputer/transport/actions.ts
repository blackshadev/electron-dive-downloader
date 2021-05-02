import { createAction } from '@reduxjs/toolkit';
import { Transport } from 'libdivecomputerjs';
import { TransportSource } from './types';

export const setTransportType = createAction<Transport>('setTransportType');
export const setSelectedTransportSource = createAction<string | undefined>(
  'setSelectedTransportSource'
);
export const getAvailableTransportSources = createAction(
  'getAvailableTransportSources'
);
export const setAvailableTransportSources = createAction<TransportSource[]>(
  'setAvailableTransportSources'
);
