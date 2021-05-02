import { channel } from '@redux-saga/core';
import { put, select, take, takeLatest } from '@redux-saga/core/effects';
import { SagaIterator } from '@redux-saga/types';
import { LogLevel } from 'libdivecomputerjs';
import { initialize } from '../../global/actions';
import { addLog, setContextState } from './actions';
import { getContext } from './selectors';

export function* initContextSaga(): SagaIterator {
  const logChannel = channel();
  const context = yield select(getContext);
  context.onLog((logLevel: LogLevel, message: string) => {
    const rnd = Math.floor(Math.random() * 255);
    const key = `${Date.now()}:${rnd}`;

    logChannel.put(addLog({ key, logLevel, message }));
  });
  yield put(setContextState('ready'));

  while (true) {
    const action = yield take(logChannel);
    yield put(action);
  }
}

export default function* contextSaga(): SagaIterator {
  yield takeLatest(initialize, initContextSaga);
}
