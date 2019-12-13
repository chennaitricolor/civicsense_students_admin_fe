import { put, call } from 'redux-saga/effects';
import actions from '../actions/login';
import { adminLoginUrl } from '../utils/constants';
import { callFetchApi } from '../services/api';

export default function* loginSaga(action) {
  const response = yield call(callFetchApi, adminLoginUrl, {}, 'POST', action.payload);
  if (response.data !== undefined && response.data.success) {
    yield put({
      type: actions.LOGIN_SUCCESS,
      response: 'Authenticated',
    });
  } else {
    yield put({
      type: actions.LOGIN_FAILURE,
      response: 'Unauthorized',
    });
  }
}
