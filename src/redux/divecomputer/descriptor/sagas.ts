import { put, takeLatest } from '@redux-saga/core/effects';
import { SagaIterator } from '@redux-saga/types';
import { Descriptor } from 'libdivecomputerjs';
import { initialize } from '../../global/actions';
import { setDescriptors } from './actions';

export function* loadDescriptorSaga(): SagaIterator {
  const descriptors = Array.from(Descriptor.iterate());
  yield put(setDescriptors(descriptors));
}

export default function* descriptorSagas(): SagaIterator {
  yield takeLatest(initialize, loadDescriptorSaga);
}
