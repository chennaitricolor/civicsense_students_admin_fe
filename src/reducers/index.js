import { combineReducers } from 'redux';
import loginResponse from './loginResponse';
import getAllCampaignsResponse from './getAllCampaignsList';
import routesReducer from './routeUrlsReducer';
import getACampaignDetailsResponse from './getACampaignDetails';

const reducers = combineReducers({
  loginResponse,
  getAllCampaignsResponse,
  routesReducer,
  getACampaignDetailsResponse
});

export default reducers;
