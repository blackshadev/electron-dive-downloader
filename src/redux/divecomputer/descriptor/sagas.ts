import { put, takeLatest } from '@redux-saga/core/effects';
import { SagaIterator } from '@redux-saga/core';
import { PayloadAction } from '@reduxjs/toolkit';
import { Descriptor } from 'libdivecomputerjs';
import { initialize } from '../../global/actions';
import { loadPersistedState } from '../../persistence';
import { selectDescriptor, setDescriptors } from './actions';

export function* loadDescriptorSaga(): SagaIterator {
  const descriptors = Array.from(Descriptor.iterate());
  yield put(setDescriptors(descriptors));
}

export function* selectPreviousSelector(
  action: PayloadAction<{ descriptors?: { selected?: string } }>
): SagaIterator {
  const selected = action.payload.descriptors?.selected;
  if (selected) {
    yield put(selectDescriptor(selected));
  }
}

export default function* descriptorSagas(): SagaIterator {
  yield takeLatest(initialize, loadDescriptorSaga);
  yield takeLatest(loadPersistedState, selectPreviousSelector);
}
