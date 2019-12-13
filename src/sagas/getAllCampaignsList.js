import { put, call } from 'redux-saga/effects';
import actions from '../actions/getAllCampaignsList';
import { getAllCampaignsUrl } from '../utils/constants';
import { callFetchApi } from '../services/api';
import moment from 'moment';


export default function* getAllLiveCampaigns() {
    //TODO: Will be removed after login page integration
    yield call(callFetchApi, '/api/csr/admin/login', {}, 'POST', {password: 'Abcd12341$',
        userId:"Maalai"});

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
