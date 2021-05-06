import { debounce, put, select, takeLatest } from '@redux-saga/core/effects';
import { SagaIterator } from '@redux-saga/types';
import {
  fetchPersistedState,
  loadPersistedState,
  persistedStateLoaded,
} from './actions';
import { isLoaded } from './selectors';
import serializeState from './serialization';

export function* markAsLoaded(): SagaIterator {
  yield put(persistedStateLoaded());
}

export function* fetchAndLoad(): SagaIterator {
  const stateString = localStorage.getItem('reduxState');
  const state = stateString ? JSON.parse(stateString) : {};
  yield put(loadPersistedState(state));
}

export function* saveState(): SagaIterator {
  const state = yield select();
  if (!isLoaded(state)) {
    return;
  }

  const serializedState = serializeState(state);
  localStorage.setItem('reduxState', JSON.stringify(serializedState));
}

export default function* persistanceSaga(): SagaIterator {
  yield takeLatest(fetchPersistedState, fetchAndLoad);
  yield takeLatest(loadPersistedState, markAsLoaded);
  yield debounce(1000, '*', saveState);
}
