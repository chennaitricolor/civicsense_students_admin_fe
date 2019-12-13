import { combineReducers } from 'redux';
import loginResponse from './loginResponse';
import getAllCampaignsResponse from './getAllCampaignsList';

const reducers = combineReducers({
  loginResponse,
  getAllCampaignsResponse,
});

export default reducers;
