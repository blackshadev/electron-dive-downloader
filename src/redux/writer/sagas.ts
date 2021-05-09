import { apply, call, put, select, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { SagaIterator } from 'redux-saga';
import FileWriter from '../../services/writer/fileWriter';
import Writer from '../../services/writer/writer';
import createWriter from '../../services/writer/writerFactory';
import { addDive, Dive } from '../dive';
import { initialize } from '../global/actions';
import { loadPersistedState } from '../persistence';
import {
  setOutputFilePath,
  setOutputType,
  writerDone,
  written,
} from './actions';
import { getIsWriting, getOutputFilePath, getOutputType } from './selectors';
import { WriterType } from './types';

let writer: Writer;

export function* setWriterPath(): SagaIterator {
  const path = yield select(getOutputFilePath);
  if (writer instanceof FileWriter) {
    writer.setFilename(path);
  }
}

export function* setWriter(): SagaIterator {
  const writeType = yield select(getOutputType);
  writer = createWriter(writeType);
  yield call(setWriterPath);
}

export function* writeDive(action: PayloadAction<Dive>): SagaIterator {
  yield apply(writer, writer.write, [action.payload]);
  yield put(written());
}

export function* checkDone(): SagaIterator {
  const isWriting = yield select(getIsWriting);

  if (isWriting) {
    return;
  }

  yield apply(writer, writer.end, []);
  yield put(writerDone());
}

export function* setPreviousState(
  action: PayloadAction<{
    writer?: { outputType: WriterType; filePath?: string };
  }>
): SagaIterator {
  if (!action.payload.writer) {
    return;
  }
  console.log('here', action.payload.writer.outputType);
  yield put(setOutputType(action.payload.writer.outputType));

  if (!action.payload.writer.filePath) {
    return;
  }
  yield put(setOutputFilePath(action.payload.writer.filePath));
}

export default function* writerSaga(): SagaIterator {
  yield takeLatest([setOutputType, initialize], setWriter);
  yield takeLatest(setOutputFilePath, setWriterPath);
  yield takeLatest(addDive, writeDive);
  yield takeLatest(written, checkDone);
  yield takeLatest(loadPersistedState, setPreviousState);
}
