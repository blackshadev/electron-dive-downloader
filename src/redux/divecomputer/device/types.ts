import { Device } from 'libdivecomputerjs';

export type ReadingState = 'none' | 'reading' | 'cancelled';

export type Progress = {
  current: number;
  maximum: number;
};

export type DeviceInfo = { firmware: number; model: number; serial: number };

export type DeviceState = {
  progress: Progress;
  deviceInfo?: DeviceInfo;
  device?: Device;
  state: ReadingState;
};
