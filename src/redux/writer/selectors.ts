import { createSelector } from 'reselect';
import { AuthState } from '../auth';
import { ReaderState, isReading } from '../divecomputer/reader';
import { WriterState, WriterType } from './types';

export const getWriterState = (state: { writer: WriterState }) => state.writer;

const fallbackOutputType: WriterType = 'file';
function canUseOutputType(type: WriterType, isLoggedIn: boolean): boolean {
  return type === 'littledev' || isLoggedIn;
}

export const getOutputType = (state: {
  writer: WriterState;
  auth: AuthState;
}) => {
  if (canUseOutputType(state.writer.outputType, state.auth.isLoggedIn)) {
    return state.writer.outputType;
  }

  return fallbackOutputType;
};

export const getIsWriting = (state: {
  writer: WriterState;
  reader: ReaderState;
}) => state.writer.pendingWrites > 0 || isReading(state);

export const getOutputFilePath = createSelector(
  getWriterState,
  (state) => state.filePath
);

export const serializeWriterStateSelector = createSelector(
  getWriterState,
  (state) => ({
    writer: {
      outputType: state.outputType,
      filePath: state.filePath,
    },
  })
);
