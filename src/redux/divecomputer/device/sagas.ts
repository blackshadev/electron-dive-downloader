import {
  AsyncDeviceReader,
  Context,
  Descriptor,
  EventType,
  Parser,
} from 'libdivecomputerjs';
import { channel, SagaIterator } from 'redux-saga';
import { put, select, take, takeLatest } from 'redux-saga/effects';
import DiveParser from '../../../services/parsing/diveParser';
import DiveSampleParser from '../../../services/parsing/diveSampleParser';
import { selectComputer } from '../../computers';
import { addDive } from '../../dive/actions';
import { getContext } from '../context';
import { selectedDescriptor } from '../descriptor';
import { getSelectedTransport, TransportSource } from '../transport';
import { setReadProgress, setDeviceState, startReading } from './actions';
import { getState } from './selectors';
import { ReadingState } from './types';

export function* readSaga(): SagaIterator {
  const deviceUpdatesChannel = channel();
  const context: Context = yield select(getContext);
  const descriptor: Descriptor = yield select(selectedDescriptor);
  const transport: TransportSource = yield select(getSelectedTransport);

  if (!descriptor) {
    throw new Error('No descriptor selected');
  }

  if (!transport) {
    throw new Error('No transport selected');
  }

  yield put(setDeviceState('reading'));

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
          deviceUpdatesChannel.put(
            setReadProgress({
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
          deviceUpdatesChannel.put(selectComputer(args.data));
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
      deviceUpdatesChannel.put(addDive(dive));
    } catch (err) {
      console.error(err);
    }
  });

  reader.read((err) => {
    console.log('done?', err?.toString());
    deviceUpdatesChannel.put(setDeviceState('none'));
  });

  let state: ReadingState = yield select(getState);
  while (state !== 'none') {
    const action = yield take(deviceUpdatesChannel);
    yield put(action);
    state = yield select(getState);
  }
}

export default function* deviceSaga(): SagaIterator {
  yield takeLatest(startReading, readSaga);
}
