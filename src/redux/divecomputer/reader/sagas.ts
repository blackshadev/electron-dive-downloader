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
import {
  findComputer,
  getComputers,
  IComputer,
  refreshComputers,
} from '../../computers';
import { addDive } from '../../dive/actions';
import withErrorHandling from '../../error/withErrorHandler';
import { getContext } from '../context';
import { selectedDescriptorSelector } from '../descriptor';
import { getSelectedTransport, TransportSource } from '../transport';
import {
  setReadProgress,
  setReaderState,
  readStart,
  receivedDeviceInfo,
  setDeviceError,
  resetDeviceError,
} from './actions';
import { getNewDivesOnly, getState } from './selectors';
import { DeviceInfo, ReadingState } from './types';

function setComputersLastFingerprint(
  reader: AsyncDeviceReader,
  computers: IComputer[],
  deviceInfo: DeviceInfo
): void {
  const computer = findComputer(computers, deviceInfo);

  const lastFingerprint = computer?.lastFingerprint;
  if (lastFingerprint) {
    reader.setFingerprint(Buffer.from(lastFingerprint, 'base64'));
  }
}

export function* readSaga(): SagaIterator {
  yield put(refreshComputers());

  const deviceUpdatesChannel = channel();
  const context: Context = yield select(getContext);
  const descriptor: Descriptor = yield select(selectedDescriptorSelector);
  const transport: TransportSource = yield select(getSelectedTransport);
  const computers: IComputer[] = yield select(getComputers);
  const newDivesOnly: boolean = yield select(getNewDivesOnly);

  if (!descriptor) {
    throw new Error('No descriptor selected');
  }

  if (!transport) {
    throw new Error('No transport selected');
  }

  yield put(setReaderState('reading'));
  yield put(resetDeviceError());

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
          deviceUpdatesChannel.put(receivedDeviceInfo(args.data));

          if (newDivesOnly) {
            setComputersLastFingerprint(reader, computers, args.data);
          }
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

    const dive = parser.parse(divedata, fingerprint);
    deviceUpdatesChannel.put(addDive(dive));
  });

  reader.read((err) => {
    if (err) {
      deviceUpdatesChannel.put(setDeviceError(err.message));
    }
    deviceUpdatesChannel.put(setReaderState('none'));
  });

  let state: ReadingState = yield select(getState);
  while (state !== 'none') {
    const action = yield take(deviceUpdatesChannel);
    yield put(action);
    state = yield select(getState);
  }
}

export default function* deviceSaga(): SagaIterator {
  yield takeLatest(readStart, withErrorHandling(readSaga, 'reader'));
}
