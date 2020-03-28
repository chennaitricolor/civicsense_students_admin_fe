import { put, call } from 'redux-saga/effects';
import actions from '../actions/getAcceptedEntriesForReport';
import { callFetchApi } from '../services/api';
import { getReportsUrl} from "../utils/constants";


export default function* getAcceptedEntriesForReportSaga(action) {
    let lastRecordCreatedAtValue;
    let applyLimitValue;
    let campaignId;
    try {
        lastRecordCreatedAtValue = action.payload.lastRecordCreatedAt;
        campaignId = action.payload.campaignId !== '' && action.payload.campaignId !== undefined ? action.payload.campaignId : '';
        applyLimitValue = action.payload.applyLimit !== '' && action.payload.applyLimit !== undefined ? action.payload.applyLimit : true;

        const response = yield call(callFetchApi, getReportsUrl, {status: 'ACCEPTED', lastRecordCreatedAt: lastRecordCreatedAtValue, live: true, applyLimit: applyLimitValue, campaignId: campaignId}, 'GET');
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

