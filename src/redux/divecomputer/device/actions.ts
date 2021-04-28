import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncDeviceReader,
  Device,
  EventType,
  Parser,
} from 'libdivecomputerjs';
import DiveParser from '../../../services/parsing/diveParser';
import DiveSampleParser from '../../../services/parsing/diveSampleParser';
import { addDive } from '../../dive/actions';
import { ContextState, getContext } from '../context';
import { DescriptorState, selectedDescriptor } from '../descriptor';
import { getSelectedTransport, TransportState } from '../transport';
import { getDevice, isCancelled } from './selectors';
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
      console.log(args);
      if (args.type === EventType.Progress) {
        thunkApi.dispatch(
          setProgress({
            current: args.data.current,
            maximum: args.data.maximum,
          })
        );
      } else if (args.type === EventType.Clock) {
        devtime = args.data.devtime;
        systime = args.data.systime;
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

      console.log(dive.date, dive.divetime, dive.tanks);
      thunkApi.dispatch(addDive(dive));
    } catch (err) {
      console.error(err);
    }
  });

  console.log('read');
  reader.read((err) => {
    console.log('done?', err?.toString());
    thunkApi.dispatch(setState('none'));
  });
});
