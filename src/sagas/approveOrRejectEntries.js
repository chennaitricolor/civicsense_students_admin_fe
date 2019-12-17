import { put, call } from 'redux-saga/effects';
import {callFetchApi} from "../services/api";
import {approveOrRejectEntriesURL} from "../utils/constants";
import entriesSubmissionActions from "../actions/approveOrRejectEntries";
import routeToPathAction from "../actions/routeToPath";
import getACampaignDetails from "../actions/getACampaignDetails";

export default function* approveOrRejectEntry(action) {
    try {
        const url = `${approveOrRejectEntriesURL + action.entryId}`;
        const response = yield call(callFetchApi, url, {}, 'PUT', action.payload);
        if (response.data !== undefined) {
            yield put({
                type: entriesSubmissionActions.ACCEPT_OR_REJECT_ENTRIES_SUCCESS,
                response: 'Entry submitted successfully',
            });
            yield put({
                type: getACampaignDetails.GET_CAMPAIGN_DETAILS,
                payload: { campaignId: action.payload.campaignId },
            });
        } else {
            yield put({
                type: entriesSubmissionActions.ACCEPT_OR_REJECT_ENTRIES_FAILURE,
                response: 'Error in submitting the entry. Please try later..',
            });
        }
    } catch (e) {
        if (e.response.status === 401) {
            yield put({
                type: routeToPathAction.ROUTE_TO_PATH,
                response: { path: '/' },
            });
        } else if (e.response.status === 400) {
            yield put({
                type: entriesSubmissionActions.ACCEPT_OR_REJECT_ENTRIES_FAILURE,
                response: e.response.message,
            });
        } else {
            yield put({
                type: entriesSubmissionActions.ACCEPT_OR_REJECT_ENTRIES_FAILURE,
                response: 'Error in submitting the entry. Please try later..',
            });
        }
    }
}