import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  BluetoothTranport,
  IRDATransport,
  SerialTransport,
  Transport,
  USBHIDTransport,
} from 'libdivecomputerjs';
import { ContextState, getContext } from '../context';
import { DescriptorState, selectedDescriptor } from '../descriptor';
import { getTransportType } from './selectors';
import { TransportSource, TransportState } from './types';

export const setTransportType = createAction<Transport>('setTransportType');
export const setTransportSource = createAction<string>('setTransport');

export const getTransportSources = createAsyncThunk<
  TransportSource[],
  void,
  {
    state: {
      context: ContextState;
      descriptors: DescriptorState;
      transport: TransportState;
    };
  }
>('getTransportSources', (_, thunkApi) => {
  const state = thunkApi.getState();
  const context = getContext(state);
  const descriptor = selectedDescriptor(state);
  const transportType = getTransportType(state);

  if (!descriptor) {
    return [] as TransportSource[];
  }

  type AllTransports =
    | typeof USBHIDTransport
    | typeof SerialTransport
    | typeof BluetoothTranport
    | typeof IRDATransport;

  let transport: AllTransports;
  switch (transportType) {
    case Transport.Serial:
      transport = SerialTransport;
      break;
    case Transport.USBHID:
      transport = USBHIDTransport;
      break;
    case Transport.IRDA:
      transport = IRDATransport;
      break;
    case Transport.Bluetooth:
      transport = BluetoothTranport;
      break;
    default:
      return [];
  }

  const transportSources = transport.iterate(context, descriptor) as (
    | USBHIDTransport
    | SerialTransport
    | BluetoothTranport
    | IRDATransport
  )[];

  return Array.from(transportSources).map(
    (transportSource) =>
      ({
        key: `${transportType}:${transportSource.toString()}`,
        name: transportSource.toString(),
        original: transportSource,
        type: transportType,
      } as TransportSource)
  );
});
