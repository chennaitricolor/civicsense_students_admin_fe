import { put, call } from 'redux-saga/effects';
import actions from '../actions/fetchLocationList';
import { callFetchApi } from '../services/api';
import { fetchLocationURL } from '../utils/constants';
import routeToPathAction from '../actions/routeToPath';

export default function* fetchLocationListSaga() {
  try {
    const response = yield call(callFetchApi, fetchLocationURL, {}, 'GET');
    if (response.data !== undefined) {
      yield put({
        type: actions.FETCH_LOCATION_LIST_SUCCESS,
        response: response.data,
      });
    } else {
      yield put({
        type: actions.FETCH_LOCATION_LIST_FAILURE,
        response: 'Error in fetching Data',
      });
    }
  } catch (e) {
    if (e.response.status === 401) {
      yield put({
        type: routeToPathAction.ROUTE_TO_PATH,
        payload: { path: '/' },
      });
    } else {
      yield put({
        type: actions.FETCH_LOCATION_LIST_FAILURE,
        payload: 'Error in fetching Data',
      });
    }
  }
}
