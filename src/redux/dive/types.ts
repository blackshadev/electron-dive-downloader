import {
  DiveMode,
  GasMix,
  WaterType,
  SampleEventType,
} from 'libdivecomputerjs';

export interface ITank {
  beginPressure?: number;
  endPressure?: number;
  gasmix?: GasMix;
  volume?: number;
  type?: 'bar' | 'psi';
  workingPressure?: number;
}

export interface ISample {
  time: number;
  temperature?: number;
  depth?: number;
  cns?: number;
  rbt?: number;
  ppo2?: number;
  bearing?: number;
  setpoint?: number;
  heartbeat?: number;
  gasmix?: number;
  pressure?: number[];
  deco?: { depth: number; time: number; type: number };
  events?: { type: SampleEventType; flags: number; value: number }[];
}

export interface Dive {
  fingerprint: string;
  date: string;
  divetime?: number;
  maxDepth?: number;
  avgDepth?: number;
  maxTemperature?: number;
  minTemperature?: number;
  surfaceTemperature?: number;
  divemode?: DiveMode;
  atmospheric?: number;
  salinity?: {
    density: number;
    type: WaterType;
  };
  tanks: ITank[];
  samples: ISample[];
}

export type DiveState = {
  dives: Dive[];
};
