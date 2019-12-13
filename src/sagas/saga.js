import { takeLatest, takeEvery } from 'redux-saga/effects';
import getAllLiveCampaigns from './getAllCampaignsList';
import loginActions from '../actions/login';
import actions from '../actions/getAllCampaignsList';
import loginSaga from './loginSaga';

export default function* saga() {
  yield takeLatest(loginActions.INITIATE_LOGIN, loginSaga);
  yield takeLatest(actions.GET_ALL_CAMPAIGNS_LIST, getAllLiveCampaigns);
}
