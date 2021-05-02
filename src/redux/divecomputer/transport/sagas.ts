import { put, select, takeLatest } from '@redux-saga/core/effects';
import { SagaIterator } from '@redux-saga/types';
import {
  BluetoothTranport,
  Context,
  Descriptor,
  IRDATransport,
  SerialTransport,
  Transport,
  USBHIDTransport,
} from 'libdivecomputerjs';
import { getContext } from '../context';
import {
  selectDescriptor,
  selectedDescriptor,
  setDescriptors,
  supportedTransports,
} from '../descriptor';
import {
  getAvailableTransportSources,
  setAvailableTransportSources,
  setSelectedTransportSource,
  setTransportType,
} from './actions';
import { getTransportType } from './selectors';
import { TransportSource } from './types';

export function* selectFirstSupportedTransport(): SagaIterator {
  const transports: Transport[] = yield select(supportedTransports);

  yield put(setTransportType(transports[0] ?? Transport.None));
}

export function* getTransportSourcesSaga(): SagaIterator {
  const context: Context = yield select(getContext);
  const descriptor: Descriptor = yield select(selectedDescriptor);
  const transportType: Transport = yield select(getTransportType);

  if (!descriptor) {
    console.log('here2 return');
    return;
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
      console.log('break', transportType);
      return;
  }

  const transportSources = transport.iterate(context, descriptor) as (
    | USBHIDTransport
    | SerialTransport
    | BluetoothTranport
    | IRDATransport
  )[];

  const availableTransportSources = Array.from(transportSources).map(
    (transportSource) =>
      ({
        key: `${transportType}:${transportSource.toString()}`,
        name: transportSource.toString(),
        original: transportSource,
        type: transportType,
      } as TransportSource)
  );

  yield put(setAvailableTransportSources(availableTransportSources));
}

export function* selectFirstTransportSource(): SagaIterator {
  const transportSources: TransportSource[] = yield select(
    getAvailableTransportSources
  );
  yield put(setSelectedTransportSource(transportSources[0]?.key));
}

export default function* transportSagas(): SagaIterator {
  yield takeLatest(
    [selectDescriptor, setDescriptors],
    selectFirstSupportedTransport
  );
  yield takeLatest(
    [setTransportType, getAvailableTransportSources],
    getTransportSourcesSaga
  );
  yield takeLatest(setAvailableTransportSources, selectFirstTransportSource);
}
