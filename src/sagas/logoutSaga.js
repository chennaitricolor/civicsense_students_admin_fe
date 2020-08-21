import { put, call } from 'redux-saga/effects';
import logoutActions from '../actions/logout';
import routeToPathAction from '../actions/routeToPath';
import { callFetchApi } from '../services/api';
import { adminLogoutUrl } from '../utils/constants';

export default function* logoutSaga() {
  try {
    const response = yield call(callFetchApi, adminLogoutUrl, {}, 'DELETE');
    if (response.data !== undefined && response.data.success) {
      yield put({
        type: logoutActions.LOGOUT_SUCCESS,
        payload: response.data,
      });
      localStorage.removeItem('persona');
      localStorage.removeItem('region');
      yield put({
        type: routeToPathAction.ROUTE_TO_PATH,
        payload: { path: '/' },
      });
    } else {
      yield put({
        type: logoutActions.LOGOUT_FAILURE,
      });
    }
  } catch (e) {
    yield put({
      type: logoutActions.LOGOUT_FAILURE,
    });
  }
}
