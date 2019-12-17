import { put, call } from 'redux-saga/effects';
import createCampaignActions from '../actions/createCampaign';
import getAllCampaignsListActions from '../actions/getAllCampaignsList';
import { callFetchApi } from '../services/api';
import { createCampaignURL } from '../utils/constants';
import routeToPathAction from '../actions/routeToPath';

export default function* createCampaignSaga(action) {
  try {
    const response = yield call(callFetchApi, createCampaignURL, {}, 'POST', action.payload);
    if (response.data !== undefined) {
      yield put({
        type: createCampaignActions.CREATE_CAMPAIGN_SUCCESS,
        response: 'Campaign details saved successfully',
      });
      yield put({
        type: getAllCampaignsListActions.GET_ALL_CAMPAIGNS_LIST,
      });
    } else {
      yield put({
        type: createCampaignActions.CREATE_CAMPAIGN_FAILURE,
        response: 'Error in saving Data',
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
        type: createCampaignActions.CREATE_CAMPAIGN_FAILURE,
        response: e.response.message,
      });
    } else {
      yield put({
        type: createCampaignActions.CREATE_CAMPAIGN_FAILURE,
        response: 'Error in saving Data',
      });
    }
  }
}
