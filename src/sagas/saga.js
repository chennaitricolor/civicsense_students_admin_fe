import { takeLatest } from 'redux-saga/effects';
import getAllLiveCampaigns from './getAllCampaignsList';
import configActions from '../actions/configActions';
import loginActions from '../actions/login';
import logoutActions from '../actions/logout';
import actions from '../actions/getAllCampaignsList';
import routesActions from '../actions/routeToPath';
import campaignDetailsActions from '../actions/getACampaignDetails';
import fetchLocationListActions from '../actions/fetchLocationList';
import createCampaignActions from '../actions/createCampaign';
import deleteCampaignActions from '../actions/deleteCampaign';
import entriesSubmissionActions from '../actions/approveOrRejectEntries';
import getOTPActions from '../actions/getOTP';
import getAcceptedEntriesForReportActions from '../actions/getAcceptedEntriesForReport';
import getAllEntriesForReportActions from '../actions/getAllEntriesForReport';
import getPositiveEntriesForReportActions from '../actions/getPositiveEntriesForReport';
import metadataActions from '../actions/metadataActions';
import getConfigSaga from './getConfigSaga';
import loginSaga from './loginSaga';
import logoutSaga from './logoutSaga';
import routesSaga from './routeUrlsSaga';
import getACampaignDetailsSaga from './getACampaignDetails';
import createCampaignSaga from './createCampaignSaga';
import fetchLocationListSaga from './fetchLocationListSaga';
import approveOrRejectEntry from './approveOrRejectEntries';
import getOTP from './getOTPSaga';
import getAcceptedEntriesForReportSaga from './getAcceptedEntriesForReportSaga';
import getAllEntriesForReportSaga from './getAllEntriesForReportSaga';
import getPositiveEntriesForReportSaga from './getPositiveEntriesForReportSaga';
import getMetaDataSaga from './getMetadataSaga';
import getDashboardEmbedAction from '../actions/GetDashboardEmbedAction';
import getDashboardEmbedUrlSaga from './GetDashboardEmbedSaga';
import deleteCampaignSaga from './deleteCampaignSaga';
import {
  workerGetVolunteerByNumberSaga, workerGetTransferVolunteerSaga,
  workerGetPatientsByVolunteerSaga, workerSaveVolunteerSaga,
  workerTransferPatientsToVolunteerSaga, workerDeleteVolunteerSaga,
  workerGetZoneWardMappingSaga, workerGetZoneListingSaga
} from './userManagementSagas';

export default function* saga() {
  yield takeLatest(configActions.GET_CONFIG, getConfigSaga);
  yield takeLatest(loginActions.INITIATE_LOGIN, loginSaga);
  yield takeLatest(logoutActions.INITIATE_LOGOUT, logoutSaga);
  yield takeLatest(routesActions.ROUTE_TO_PATH, routesSaga);
  yield takeLatest(actions.GET_ALL_CAMPAIGNS_LIST, getAllLiveCampaigns);
  yield takeLatest(campaignDetailsActions.GET_CAMPAIGN_DETAILS, getACampaignDetailsSaga);
  yield takeLatest(fetchLocationListActions.FETCH_LOCATION_LIST, fetchLocationListSaga);
  yield takeLatest(createCampaignActions.CREATE_CAMPAIGN, createCampaignSaga);
  yield takeLatest(entriesSubmissionActions.ACCEPT_OR_REJECT_ENTRIES, approveOrRejectEntry);
  yield takeLatest(getOTPActions.GET_LOGIN_OTP, getOTP);
  yield takeLatest(getAcceptedEntriesForReportActions.GET_ACCEPTED_ENTRIES, getAcceptedEntriesForReportSaga);
  yield takeLatest(getAllEntriesForReportActions.GET_ALL_ENTRIES, getAllEntriesForReportSaga);
  yield takeLatest(getPositiveEntriesForReportActions.GET_POSITIVE_ENTRIES, getPositiveEntriesForReportSaga);
  yield takeLatest(metadataActions.GET_METADATA, getMetaDataSaga);
  yield takeLatest(getDashboardEmbedAction.GET_DASHBOARD_EMBED_URL, getDashboardEmbedUrlSaga);
  yield takeLatest(deleteCampaignActions.DELETE_CAMPAIGN, deleteCampaignSaga);
  yield takeLatest('SEARCH_VOLUNTEER_BY_NUMBER', workerGetVolunteerByNumberSaga);
  yield takeLatest('FETCH_TRANSFER_VOLUNTEER', workerGetTransferVolunteerSaga);
  yield takeLatest('FETCH_PATIENTS_FOR_VOLUNTEER', workerGetPatientsByVolunteerSaga);
  yield takeLatest('SAVE_VOLUNTEER', workerSaveVolunteerSaga);
  yield takeLatest('TRANSFER_PATIENTS', workerTransferPatientsToVolunteerSaga);
  yield takeLatest('DELETE_VOLUNTEER', workerDeleteVolunteerSaga);
  yield takeLatest('ZONE_WARD_MAPPING', workerGetZoneWardMappingSaga);
  yield takeLatest('ZONE_LISTING', workerGetZoneListingSaga);
}
