export type WriterType = 'file' | 'littledev';

export type WriterState = {
  outputType: WriterType;
  isReading: boolean;
  pendingWrites: number;
};
