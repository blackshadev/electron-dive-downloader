import { SagaIterator } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import userReadableError from '../../services/userReadableError';
import { error } from '../logging';

export default function withErrorHandling<T>(
  effect: (...args: any[]) => SagaIterator<T>,
  source = 'unknown'
): (...args: any[]) => SagaIterator {
  return function* safe(...args) {
    try {
      return yield call(effect, ...args);
    } catch (err) {
      return yield put(error({ source, message: userReadableError(err) }));
    }
  };
}
