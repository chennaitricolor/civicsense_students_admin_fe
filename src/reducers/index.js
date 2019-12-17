import { combineReducers } from 'redux';
import loginResponse from './loginResponse';
import getAllCampaignsResponse from './getAllCampaignsList';
import routesReducer from './routeUrlsReducer';
import getACampaignDetailsResponse from './getACampaignDetails';
import fetchLocationListReducer from './fetchLocationListReducer';
import createCampaignReducer from './createCampaignReducer';

const reducers = combineReducers({
  loginResponse,
  getAllCampaignsResponse,
  routesReducer,
  getACampaignDetailsResponse,
  fetchLocationListReducer,
  createCampaignReducer,
});

export default reducers;
