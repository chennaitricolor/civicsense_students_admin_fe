import { put, call } from 'redux-saga/effects';
import actions from '../actions/getAllEntriesForReport';
import { callFetchApi } from '../services/api';
import { getReportsUrl } from '../utils/constants';

export default function* getAcceptedEntriesForReportSaga() {
  try {
    const response = yield call(
      callFetchApi,
      getReportsUrl,
      {
        status: 'OPEN,ACCEPTED,SUBMITTED,CLOSED,REJECTED',
        live: false,
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
    yield put({
      type: actions.GET_ALL_ENTRIES_FAILURE,
      payload: 'Error in fetching Data',
    });
  }
}
