import { put, call } from 'redux-saga/effects';
import actions from '../actions/getPositiveEntriesForReport';
import { callFetchApi } from '../services/api';
import { getPositiveEntriesUrl } from '../utils/constants';

export default function* getPositiveEntriesForReportSaga() {
  try {
    const response = yield call(callFetchApi, getPositiveEntriesUrl, {}, 'GET');
    if (response.data !== undefined) {
      yield put({
        type: actions.GET_POSITIVE_ENTRIES_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({
        type: actions.GET_POSITIVE_ENTRIES_FAILURE,
        payload: 'Error in fetching positive entries for report..',
      });
    }
  } catch (e) {
    yield put({
      type: actions.GET_POSITIVE_ENTRIES_FAILURE,
      payload: 'Error in fetching Data',
    });
  }
}
