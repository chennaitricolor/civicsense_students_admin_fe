import { combineReducers } from 'redux';
import loginResponse from './loginResponse';
import getAllCampaignsResponse from './getAllCampaignsList';
import routesReducer from './routeUrlsReducer';

const reducers = combineReducers({
  loginResponse,
  getAllCampaignsResponse,
  routesReducer
});

export default reducers;
