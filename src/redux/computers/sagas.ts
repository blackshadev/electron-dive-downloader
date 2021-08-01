import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import getComputersApi from '../../services/api/computers/getComputers';
import { getAccessToken, loggedin, loggedout } from '../auth';
import withAccessToken from '../auth/withAccessTokenSaga';
import { refreshComputers, resetComputers, setComputers } from './actions';
import { IComputer } from './types';

export function* getUserComputerSaga(): SagaIterator {
  const accesstoken: string | undefined = yield select(getAccessToken);

  if (accesstoken === null) {
    return;
  }

  const userComputers: IComputer[] = yield call(
    withAccessToken,
    getComputersApi,
    accesstoken
  );

  yield put(setComputers(userComputers));
}

export function* resetComputerSaga(): SagaIterator {
  yield put(resetComputers);
}

export default function* computerSaga(): SagaIterator {
  yield takeLatest([loggedin, refreshComputers], getUserComputerSaga);
  yield takeLatest(loggedout, resetComputerSaga);
}
