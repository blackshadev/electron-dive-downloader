import { createSelector } from 'reselect';
import { ReaderState, isReading } from '../divecomputer/reader';
import { WriterState } from './types';

export const getWriterState = (state: { writer: WriterState }) => state.writer;

export const getOutputType = createSelector(
  getWriterState,
  (state) => state.outputType
);

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
