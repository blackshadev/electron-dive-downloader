import { DeviceState, isReading } from '../divecomputer/device';
import { WriterState } from './types';

export const getOutputState = (state: { writer: WriterState }) =>
  state.writer.outputType;

export const getIsWriting = (state: {
  writer: WriterState;
  device: DeviceState;
}) => state.writer.pendingWrites > 0 || isReading(state);
