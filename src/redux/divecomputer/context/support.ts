import { LogLevel as DCLogLevel } from 'libdivecomputerjs';
import { LogLevel } from '../../logging/types';

export function translateDCLogLevel(logLevel: DCLogLevel): LogLevel {
  switch (logLevel) {
    case DCLogLevel.All:
    case DCLogLevel.Debug:
    case DCLogLevel.Info:
      return LogLevel.Notice;
    case DCLogLevel.Error:
      return LogLevel.Error;
    case DCLogLevel.Warning:
      return LogLevel.Warning;
    default:
      return LogLevel.Error;
  }
}

export function translateLogLevel(logLevel: LogLevel): DCLogLevel {
  switch (logLevel) {
    case LogLevel.None:
      return DCLogLevel.None;
    case LogLevel.Warning:
      return DCLogLevel.Warning;
    case LogLevel.Notice:
      return DCLogLevel.Info;
    case LogLevel.Error:
    default:
      return DCLogLevel.Error;
  }
}
