import { put, call } from 'redux-saga/effects';
import getAllCampaignsListActions from '../actions/getAllCampaignsList';
import { callFetchApi } from '../services/api';
import { createCampaignURL } from '../utils/constants';
import routeToPathAction from '../actions/routeToPath';

export default function* deleteCampaignSaga(action) {
  try {
    const response = yield call(callFetchApi, `${createCampaignURL}/${action.payload}`, {}, 'DELETE');
    if (response.status === 200) {
      yield put({
        type: getAllCampaignsListActions.GET_ALL_CAMPAIGNS_LIST,
      });
    } else {
      window.alert('Error deleting campaign');
    }
  } catch (e) {
    if (e.response.status === 401) {
      yield put({
        type: routeToPathAction.ROUTE_TO_PATH,
        response: { path: '/' },
      });
    } else {
      window.alert('Error deleting campaign');
    }
  }
}
