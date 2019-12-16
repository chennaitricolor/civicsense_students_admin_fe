import { put, call } from 'redux-saga/effects';
import actions from '../actions/getAllCampaignsList';
import { getAllCampaignsUrl } from '../utils/constants';
import { callFetchApi } from '../services/api';
import routeToPathAction from '../actions/routeToPath';


export default function* getAllLiveCampaigns() {
    try {

    const response = yield call(
        callFetchApi,
        getAllCampaignsUrl,
        {},
        'GET',
    );
    if (response.data !== undefined) {
            yield put({
                type: actions.GET_ALL_CAMPAIGNS_LIST_SUCCESS,
                payload: response.data,
            });
    } else {
        yield put({
            type: actions.GET_ALL_CAMPAIGNS_LIST_FAILURE,
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
                type: actions.GET_ALL_CAMPAIGNS_LIST_FAILURE,
                payload: 'Error in fetching Data',
            });
        }
    }
}
