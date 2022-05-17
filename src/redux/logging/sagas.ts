import { put, takeEvery } from '@redux-saga/core/effects';
import { SagaIterator } from '@redux-saga/core';
import { PayloadAction } from '@reduxjs/toolkit';
import { error, ErrorInput, log } from './actions';
import { LogLevel } from './types';

export function* emitErrorToLog(
  action: PayloadAction<ErrorInput>
): SagaIterator {
  yield put(log({ ...action.payload, loglevel: LogLevel.Error }));
}

export function* loggingSagas(): SagaIterator {
  yield takeEvery(error, emitErrorToLog);
}
