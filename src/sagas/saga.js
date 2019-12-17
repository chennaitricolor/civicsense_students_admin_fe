import { takeLatest, call } from 'redux-saga/effects';
import getAllLiveCampaigns from './getAllCampaignsList';
import loginActions from '../actions/login';
import actions from '../actions/getAllCampaignsList';
import routesActions from '../actions/routeToPath';
import campaignDetailsActions from '../actions/getACampaignDetails';
import fetchLocationListActions from '../actions/fetchLocationList';
import createCampaignActions from '../actions/createCampaign';
import loginSaga from './loginSaga';
import routesSaga from './routeUrlsSaga';
import getACampaignDetailsSaga from './getACampaignDetails';
import createCampaignSaga from './createCampaignSaga';
import fetchLocationListSaga from './fetchLocationListSaga';

export default function* saga() {
  yield takeLatest(loginActions.INITIATE_LOGIN, loginSaga);
  yield takeLatest(routesActions.ROUTE_TO_PATH, routesSaga);
  yield takeLatest(actions.GET_ALL_CAMPAIGNS_LIST, getAllLiveCampaigns);
  yield takeLatest(campaignDetailsActions.GET_CAMPAIGN_DETAILS, getACampaignDetailsSaga);
  yield takeLatest(fetchLocationListActions.FETCH_LOCATION_LIST, fetchLocationListSaga);
  yield takeLatest(createCampaignActions.CREATE_CAMPAIGN, createCampaignSaga);
}
