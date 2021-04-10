import { TransportState } from './types';

export const getTransportType = (state: { transport: TransportState }) =>
  state.transport.type;

export const getAvailableTransports = (state: { transport: TransportState }) =>
  state.transport.availableTransports;

export const getSelectedTransport = (state: { transport: TransportState }) =>
  state.transport.transport;
