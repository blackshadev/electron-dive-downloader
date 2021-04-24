import { Device } from 'libdivecomputerjs';

export type ReadingState = 'none' | 'reading' | 'cancelled';

export type DeviceState = {
  progress: {
    current: number;
    maximum: number;
  };
  device?: Device;
  serial?: string;
  fingerprint?: string;
  state: ReadingState;
};
