import { put, call } from 'redux-saga/effects';
import actions from '../actions/getACampaignDetails';
import { getACampaignDetails } from '../utils/constants';
import { callFetchApi } from '../services/api';
import routeToPathAction from '../actions/routeToPath';

export default function* getCampaignDetails(action) {
  let lastRecordCreatedAt;
  try {
    lastRecordCreatedAt = action.payload.lastRecordCreatedAt ? `${'?lastRecordCreatedAt=' + action.payload.lastRecordCreatedAt}` : '';
    let api_url = `${getACampaignDetails + action.payload.campaignId + lastRecordCreatedAt}`;
    const response = yield call(callFetchApi, api_url, {}, 'GET');
    if (response.data !== undefined) {
      if(lastRecordCreatedAt === '') {
        yield put({
          type: actions.CLEAR_CAMPAIGN_ENTRIES
        });
      }
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
  } catch (e) {
    if (e.response !== undefined && e.response.status === 401) {
      yield put({
        type: routeToPathAction.ROUTE_TO_PATH,
        payload: { path: '/' },
      });
    } else {
      if(lastRecordCreatedAt === '') {
        yield put({
          type: actions.CLEAR_CAMPAIGN_ENTRIES
        });
      }
      yield put({
        type: actions.GET_CAMPAIGN_DETAILS_FAILURE,
        payload: 'Error in fetching Data',
      });
    }
  }
}
