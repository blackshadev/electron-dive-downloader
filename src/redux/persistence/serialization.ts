import { Selector } from 'react-redux';
import { serializableAuthSelector } from '../auth';
import { serializableDescriptorSelector } from '../divecomputer/descriptor';
import { serializeWriterStateSelector } from '../writer';

type Serializer<T> = Selector<T, Record<string, unknown>>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const serializers: Serializer<any>[] = [
  serializableAuthSelector,
  serializableDescriptorSelector,
  serializeWriterStateSelector,
];

export default function serializeState<T>(state: T): Record<string, unknown> {
  let serializableState = {};

  for (const serializer of serializers) {
    serializableState = { ...serializableState, ...serializer(state) };
  }

  return serializableState;
}
