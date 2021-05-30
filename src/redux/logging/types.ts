export enum LogLevel {
  None = 0,
  Error,
  Warning,
  Notice,
}

export interface LogLine {
  source: string;
  message: string;
  loglevel: LogLevel;
  key: string;
}

export type LoggingState = {
  loglines: LogLine[];
  loglevel: LogLevel;
  errors: LogLine[];
};
