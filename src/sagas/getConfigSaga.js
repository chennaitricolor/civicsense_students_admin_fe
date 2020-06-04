import { call, put } from 'redux-saga/effects';
import { callFetchApi } from '../services/api';
import actions from '../actions/configActions';
import * as constants from '../utils/constants';

export default function* getConfigSaga() {
  try {
    const response = yield call(callFetchApi, constants.getConfigUrl, {}, 'GET');
    yield put({
      type: actions.GET_CONFIG_SUCCESS,
      response: response.data,
    });
  } catch (error) {
    yield put({
      type: actions.GET_CONFIG_FAILURE,
      error,
    });
  }
}
