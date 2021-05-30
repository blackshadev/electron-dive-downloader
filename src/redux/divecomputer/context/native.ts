import { Context, LogLevel } from 'libdivecomputerjs';

let context: Context;
export function getContext(): Context {
  return context;
}

export function setContext(ctx: Context): void {
  context = ctx;
}

export function setLogLevel(loglevel: LogLevel): void {
  context.logLevel = loglevel;
}
