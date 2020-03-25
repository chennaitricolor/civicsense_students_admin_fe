import { takeLatest, call } from 'redux-saga/effects';
import getAllLiveCampaigns from './getAllCampaignsList';
import loginActions from '../actions/login';
import actions from '../actions/getAllCampaignsList';
import routesActions from '../actions/routeToPath';
import campaignDetailsActions from '../actions/getACampaignDetails';
import fetchLocationListActions from '../actions/fetchLocationList';
import createCampaignActions from '../actions/createCampaign';
import entriesSubmissionActions from '../actions/approveOrRejectEntries';
import getOTPActions from '../actions/getOTP';
import getAcceptedEntriesForReportActions from '../actions/getAcceptedEntriesForReport';
import loginSaga from './loginSaga';
import routesSaga from './routeUrlsSaga';
import getACampaignDetailsSaga from './getACampaignDetails';
import createCampaignSaga from './createCampaignSaga';
import fetchLocationListSaga from './fetchLocationListSaga';
import approveOrRejectEntry from './approveOrRejectEntries';
import getOTP from './getOTPSaga';
import getAcceptedEntriesForReportSaga from './getAcceptedEntriesForReportSaga';

export default function* saga() {
  yield takeLatest(loginActions.INITIATE_LOGIN, loginSaga);
  yield takeLatest(routesActions.ROUTE_TO_PATH, routesSaga);
  yield takeLatest(actions.GET_ALL_CAMPAIGNS_LIST, getAllLiveCampaigns);
  yield takeLatest(campaignDetailsActions.GET_CAMPAIGN_DETAILS, getACampaignDetailsSaga);
  yield takeLatest(fetchLocationListActions.FETCH_LOCATION_LIST, fetchLocationListSaga);
  yield takeLatest(createCampaignActions.CREATE_CAMPAIGN, createCampaignSaga);
  yield takeLatest(entriesSubmissionActions.ACCEPT_OR_REJECT_ENTRIES, approveOrRejectEntry);
  yield takeLatest(getOTPActions.GET_LOGIN_OTP, getOTP);
  yield takeLatest(getAcceptedEntriesForReportActions.GET_ACCEPTED_ENTRIES, getAcceptedEntriesForReportSaga);
}
