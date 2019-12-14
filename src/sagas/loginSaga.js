import { put, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import loginActions from '../actions/login';
import routeToPathAction from '../actions/routeToPath';
import { adminLoginUrl } from '../utils/constants';
import { callFetchApi } from '../services/api';
import history from '../utils/history';

export default function* loginSaga(action) {
  const response = yield call(callFetchApi, adminLoginUrl, {}, 'POST', action.payload);
  if (response.data !== undefined && response.data.success) {
    yield put({
      type: loginActions.LOGIN_SUCCESS,
      response: 'Authenticated',
    });

    yield put({
      type: routeToPathAction.ROUTE_TO_PATH,
      payload: { path: '/home'}
    });
  } else {
    yield put({
      type: loginActions.LOGIN_FAILURE,
      response: 'Unauthorized',
    });
  }
}
