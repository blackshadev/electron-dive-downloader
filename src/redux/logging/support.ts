import { LogLevel } from './types';

export default function getAllLogLevelKeys(): Array<keyof typeof LogLevel> {
  return ['None', 'Error', 'Warning', 'Notice'];
}
