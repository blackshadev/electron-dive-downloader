import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncDeviceReader, Device, EventType } from 'libdivecomputerjs';
import { ContextState, getContext } from '../context';
import { DescriptorState, selectedDescriptor } from '../descriptor';
import { getSelectedTransport, TransportState } from '../transport';
import { isCancelled } from './selectors';
import { DeviceState, ReadingState } from './types';

export const setProgress = createAction<{ current: number; maximum: number }>(
  'setProgress'
);
export const setState = createAction<ReadingState>('setState');
export const setFingerprint = createAction<string>('setFingerprint');
export const setDeviceSerial = createAction<string>('setDeviceSerial');

export const startReading = createAsyncThunk<
  void,
  void,
  {
    state: {
      context: ContextState;
      descriptors: DescriptorState;
      transport: TransportState;
      device: DeviceState;
    };
  }
>('startReading', async (_, thunkApi) => {
  const state = thunkApi.getState();
  const context = getContext(state);
  const descriptor = selectedDescriptor(state);
  const transport = getSelectedTransport(state);

  console.log('here1');
  if (!descriptor) {
    throw new Error('No descriptor selected');
  }

  if (!transport) {
    throw new Error('No transport selected');
  }
  thunkApi.dispatch(setState('reading'));

  const reader = new AsyncDeviceReader();
  reader.setContext(context);
  reader.setDescriptor(descriptor);
  reader.setTransport(transport.original);

  reader.onEvents([EventType.DevInfo, EventType.Progress], (args) => {
    console.log(args);
    if (args.type === EventType.Progress) {
      thunkApi.dispatch(
        setProgress({ current: args.data.current, maximum: args.data.maximum })
      );
    }
  });

  reader.onDive((dive, fingerprint) => {
    console.log(fingerprint.toString('base64'));
  });

  reader.read(() => {
    thunkApi.dispatch(setState('none'));
  });
});
