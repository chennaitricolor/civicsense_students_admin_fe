import { put, call } from 'redux-saga/effects';
import actions from '../actions/getAllEntriesForReport';
import { callFetchApi } from '../services/api';
import { getReportsUrl } from '../utils/constants';
import routeToPathAction from "../actions/routeToPath";

export default function* getAcceptedEntriesForReportSaga(action) {
  try {
    const response = yield call(
      callFetchApi,
      getReportsUrl,
      {
        status: 'OPEN,ACCEPTED,SUBMITTED,CLOSED,REJECTED',
        live: false,
        locationNm: action.payload.locationNm,
        lastRecordCreatedAt: action.payload.lastRecordCreatedAt,
        limit: 1000,
        applyLimit: true
      },
      'GET',
    );
    if (response.data !== undefined) {
      yield put({
        type: actions.GET_ALL_ENTRIES_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({
        type: actions.GET_ALL_ENTRIES_FAILURE,
        payload: 'Error in fetching accepted entries for report..',
      });
    }
  } catch (e) {
    if (e.response !== undefined && e.response.status === 401) {
      yield put({
        type: routeToPathAction.ROUTE_TO_PATH,
        payload: { path: '/' },
      });
    }
    else {
      yield put({
        type: actions.GET_ALL_ENTRIES_FAILURE,
        payload: 'Error in fetching Data',
      });
    }
  }
}
