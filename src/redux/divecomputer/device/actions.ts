import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncDeviceReader, EventType, Parser } from 'libdivecomputerjs';
import DiveParser from '../../../services/parsing/diveParser';
import DiveSampleParser from '../../../services/parsing/diveSampleParser';
import { selectComputer } from '../../computers';
import { addDive } from '../../dive/actions';
import { ContextState, getContext } from '../context';
import { DescriptorState, selectedDescriptor } from '../descriptor';
import { getSelectedTransport, TransportState } from '../transport';

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
  reader.onDevice(() => {});

  let devtime = 0;
  let systime = 0n;

  reader.onEvents(
    [EventType.Clock, EventType.DevInfo, EventType.Progress, EventType.Waiting],
    (args) => {
      switch (args.type) {
        case EventType.Progress:
          thunkApi.dispatch(
            setProgress({
              current: args.data.current,
              maximum: args.data.maximum,
            })
          );
          break;
        case EventType.Clock:
          devtime = args.data.devtime;
          systime = args.data.systime;
          break;
        case EventType.DevInfo:
          thunkApi.dispatch(selectComputer(args.data));
          break;
        default:
          break;
      }
    }
  );

  reader.onDive((divedata, fingerprint) => {
    const parser = new DiveParser(
      new Parser(context, descriptor, devtime, systime),
      new DiveSampleParser()
    );
    console.log('dive', fingerprint.toString('base64'));
    try {
      const dive = parser.parse(divedata, fingerprint);

      thunkApi.dispatch(addDive(dive));
    } catch (err) {
      console.error(err);
    }
  });

  reader.read((err) => {
    console.log('done?', err?.toString());
    thunkApi.dispatch(setState('none'));
  });
});
