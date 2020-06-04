import { combineReducers } from 'redux';
import getConfigReducer from './getConfigReducer';
import loginResponse from './loginResponse';
import getAllCampaignsResponse from './getAllCampaignsList';
import routesReducer from './routeUrlsReducer';
import getACampaignDetailsResponse from './getACampaignDetails';
import fetchLocationListReducer from './fetchLocationListReducer';
import createCampaignReducer from './createCampaignReducer';
import entrySubmissionReducer from './approveOrRejectEntryReducer';
import getOTPReducer from './getOTPReducer';
import getAcceptedEntriesForReport from './getAcceptedEntriesForReportReducer';
import getAllEntriesForReportReducer from './getAllEntriesForReportReducer';
import getPositiveEntriesForReportReducer from './getPositiveEntriesForReportReducer';

const reducers = combineReducers({
  getConfigReducer,
  loginResponse,
  getAllCampaignsResponse,
  routesReducer,
  getACampaignDetailsResponse,
  fetchLocationListReducer,
  createCampaignReducer,
  entrySubmissionReducer,
  getOTPReducer,
  getAcceptedEntriesForReport,
  getAllEntriesForReportReducer,
  getPositiveEntriesForReportReducer,
});

export default reducers;
