import { takeLatest, call } from 'redux-saga/effects';
import getAllLiveCampaigns from './getAllCampaignsList';
import loginActions from '../actions/login';
import actions from '../actions/getAllCampaignsList';
import routesActions from '../actions/routeToPath';
import loginSaga from './loginSaga';
import routesSaga from './routeUrlsSaga';

export default function* saga() {
  yield takeLatest(loginActions.INITIATE_LOGIN, loginSaga);
  yield takeLatest(actions.GET_ALL_CAMPAIGNS_LIST, getAllLiveCampaigns);
  yield takeLatest(routesActions.ROUTE_TO_PATH, routesSaga);
}
