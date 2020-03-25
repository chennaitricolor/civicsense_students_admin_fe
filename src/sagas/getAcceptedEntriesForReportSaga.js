import { put, call } from 'redux-saga/effects';
import actions from '../actions/getAcceptedEntriesForReport';
import { callFetchApi } from '../services/api';
import {getReportsUrl} from "../utils/constants";


export default function* getAcceptedEntriesForReportSaga(action) {
    try {
        const response = yield call(callFetchApi, getReportsUrl, {status: 'ACCEPTED'}, 'GET');
        if (response.data !== undefined) {
            yield put({
                type: actions.GET_ACCEPTED_ENTRIES_SUCCESS,
                payload: response.data,
            });
        } else {
            yield put({
                type: actions.GET_ACCEPTED_ENTRIES_FAILURE,
                payload: 'Error in fetching accepted entries for report..',
            });
        }
    }
    catch (e) {
        yield put({
            type: actions.GET_ACCEPTED_ENTRIES_FAILURE,
            payload: 'Error in fetching Data',
        });
    }
}

