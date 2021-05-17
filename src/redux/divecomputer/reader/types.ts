import { Device } from 'libdivecomputerjs';

export type ReadingState = 'none' | 'reading' | 'cancelled';

export type Progress = {
  current: number;
  maximum: number;
};

export type DeviceInfo = { firmware: number; model: number; serial: number };

export type ReaderState = {
  progress: Progress;
  deviceInfo?: DeviceInfo;
  device?: Device;
  state: ReadingState;
  error?: string;
  newDivesOnly: boolean;
};
