import { put, call } from 'redux-saga/effects';
import actions from '../actions/getACampaignDetails';
import { getACampaignDetails } from '../utils/constants';
import { callFetchApi } from '../services/api';
import routeToPathAction from "../actions/routeToPath";


export default function* getCampaignDetails(action) {
    try {
        let api_url = `${getACampaignDetails + action.payload.campaignId}`;

    const response = yield call(
        callFetchApi,
        api_url,
        {},
        'GET',
    );
    if (response.data !== undefined) {
        yield put({
            type: actions.GET_CAMPAIGN_DETAILS_SUCCESS,
            payload: response.data,
        });
    } else {
        yield put({
            type: actions.GET_CAMPAIGN_DETAILS_FAILURE,
            payload: 'Error in fetching Data',
        });
    }
    }
    catch (e) {
        if(e.response.status === 401) {
            yield put({
                type: routeToPathAction.ROUTE_TO_PATH,
                payload: { path: '/'}
            });
        }
        else {
            yield put({
                type: actions.GET_CAMPAIGN_DETAILS_FAILURE,
                payload: 'Error in fetching Data',
            });
        }
    }
}
