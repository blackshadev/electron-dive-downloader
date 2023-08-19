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
  Time: number;
  Temperature?: number;
  Depth?: number;
  CNS?: number;
  RBT?: number;
  PPO2?: number;
  Bearing?: number;
  SetPoint?: number;
  Heartbeat?: number;
  Gasmix?: number;
  Pressure?: { Pressure: number; Tank: number }[];
  Deco?: { Depth: number; Time: number; Type: number };
  Events?: { Type: SampleEventType; Flags: number; Value: number }[];
}

export interface Dive {
  fingerprint: string;
  date: string;
  divetime: number;
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
