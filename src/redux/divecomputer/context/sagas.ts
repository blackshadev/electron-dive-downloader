import { channel, SagaIterator } from '@redux-saga/core';
import { put, select, take, takeLatest } from '@redux-saga/core/effects';
import { Context, LogLevel as DCLogLevel } from 'libdivecomputerjs';
import { initialize } from '../../global/actions';
import { getLogLevel, log, LogLevel, setLogLevel } from '../../logging';
import { translateDCLogLevel, translateLogLevel } from './support';
import { setContextState } from './actions';
import { getContext } from './selectors';
import { setContext, setLogLevel as setNativeLogLevel } from './native';

export function* initContextSaga(): SagaIterator {
  setContext(new Context());
  const logChannel = channel();
  const context = getContext();
  context.onLog((logLevel: DCLogLevel, message: string) => {
    logChannel.put(
      log({
        source: 'libdivecomputer',
        loglevel: translateDCLogLevel(logLevel),
        message,
      })
    );
  });
  yield put(setContextState('ready'));

  while (true) {
    const action = yield take(logChannel);
    yield put(action);
  }
}

export function* setLogLevelSaga(): SagaIterator {
  const logLevel: LogLevel = yield select(getLogLevel);
  setNativeLogLevel(translateLogLevel(logLevel));
}

export default function* contextSaga(): SagaIterator {
  yield takeLatest(initialize, initContextSaga);
  yield takeLatest(setLogLevel, setLogLevelSaga);
}
