import { createAction, Selector } from '@reduxjs/toolkit';

export const loadPersistedState = createAction<any>('load');

export function makeSerializable<T>(
  state: T,
  ...selectors: Selector<T, any>[]
): any {
  let serializableState = {};

  for (const selector of selectors) {
    serializableState = { ...selector(state) };
  }

  return serializableState;
}

export default loadPersistedState;
