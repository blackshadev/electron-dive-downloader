import { SagaIterator } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import userReadableError from '../../services/userReadableError';
import { error } from '../logging';

export default function withErrorHandling<A, T>(
  effect: (...args: A[]) => SagaIterator<T>,
  source = 'unknown'
): (...args: A[]) => SagaIterator {
  return function* safe(...args) {
    try {
      return yield call(effect, ...args);
    } catch (err) {
      return yield put(error({ source, message: userReadableError(err) }));
    }
  };
}
