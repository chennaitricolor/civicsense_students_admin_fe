import { takeLatest, takeEvery } from 'redux-saga/effects';
import getAllLiveCampaigns from './getAllCampaignsList';
import actions from '../actions/getAllCampaignsList';

export default function *saga() {
    yield takeLatest(actions.GET_ALL_CAMPAIGNS_LIST, getAllLiveCampaigns);
}