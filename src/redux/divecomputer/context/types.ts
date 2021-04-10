import { Context, LogLevel } from 'libdivecomputerjs';

export interface LogLine {
  logLevel: LogLevel;
  message: string;
  key: string;
}

export type ContextState = {
  loglines: LogLine[];
  state: 'ready' | 'uninitialized';
  context: Context;
};
