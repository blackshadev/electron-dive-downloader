import { Device } from 'libdivecomputerjs';

export type ReadingState = 'none' | 'reading' | 'cancelled';

export type Progress = {
  current: number;
  maximum: number;
};

export type DeviceState = {
  progress: Progress;
  device?: Device;
  serial?: string;
  fingerprint?: string;
  state: ReadingState;
};
