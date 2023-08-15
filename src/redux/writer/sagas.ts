import { call, put, select, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { Descriptor } from 'libdivecomputerjs';
import { SagaIterator } from 'redux-saga';
import FileWriter from '../../services/writer/fileWriter';
import LittledivelogWriter from '../../services/writer/littledivelogWriter';
import Writer from '../../services/writer/writer';
import createWriter from '../../services/writer/writerFactory';
import { getAccessToken, setAccessToken } from '../auth';
import { execWithAccessToken } from '../auth/withAccessTokenSaga';
import { addDive, Dive } from '../dive';
import { selectedDescriptorSelector } from '../divecomputer/descriptor';
import {
  DeviceInfo,
  getDeviceInfo,
  receivedDeviceInfo,
  readerFinished,
} from '../divecomputer/reader';
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

export function* updateAccessToken(): SagaIterator {
  const accessToken: string = yield select(getAccessToken);
  if (writer instanceof LittledivelogWriter) {
    writer.setAccessToken(accessToken);
  }
}

export function* updateComputer(): SagaIterator {
  const descriptor: Descriptor = yield select(selectedDescriptorSelector);
  const devInfo: DeviceInfo = yield select(getDeviceInfo);
  yield call(execWithAccessToken, () =>
    writer.setComputer(descriptor, devInfo)
  );
}

export function* setWriter(): SagaIterator {
  const writeType = yield select(getOutputType);
  writer = createWriter(writeType);
  yield call(setWriterPath);
  yield call(updateAccessToken);
}

export function* writeDive(action: PayloadAction<Dive>): SagaIterator {
  yield call([writer, writer.write], action.payload);
  yield put(written());
}

export function* checkDone(): SagaIterator {
  const isWriting = yield select(getIsWriting);

  if (isWriting) {
    return;
  }

  yield call([writer, writer.end]);
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
  yield takeLatest(readerFinished, checkDone);
  yield takeLatest(receivedDeviceInfo, updateComputer);
  yield takeLatest(setAccessToken, updateAccessToken);
  yield takeLatest(loadPersistedState, setPreviousState);
}
