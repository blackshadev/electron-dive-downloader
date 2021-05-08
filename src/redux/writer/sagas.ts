import { apply, call, put, select, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { SagaIterator } from 'redux-saga';
import Writer from '../../services/writer/writer';
import createWriter from '../../services/writer/writerFactory';
import { addDive, Dive } from '../dive';
import { initialize } from '../global/actions';
import { setOutputType, writerDone, written } from './actions';
import { getIsWriting, getOutputState } from './selectors';

let writer: Writer;

export function* setWriter(): SagaIterator {
  const writeType = yield select(getOutputState);
  writer = createWriter(writeType);
}

export function* writeDive(action: PayloadAction<Dive>): SagaIterator {
  yield apply(writer, writer.write, [action.payload]);
  yield put(written());
}

export function* checkDone(): SagaIterator {
  const isWriting = yield select(getIsWriting);
  const all = yield select();

  console.log(
    'isWriting',
    isWriting,
    all.writer.pendingWrites,
    all.writer.isReading
  );
  if (isWriting) {
    return;
  }

  yield apply(writer, writer.end, []);
  yield put(writerDone());
}

export default function* writerSaga(): SagaIterator {
  yield takeLatest([setOutputType, initialize], setWriter);
  yield takeLatest(addDive, writeDive);
  yield takeLatest(written, checkDone);
}
