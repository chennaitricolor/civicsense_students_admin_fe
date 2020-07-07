import { call, put } from 'redux-saga/effects';
import { callFetchApi } from '../services/api';
import actions from '../actions/metadataActions';
import * as constants from '../utils/constants';

export default function* getMetadataSaga(action) {
  try {
    const response = yield call(callFetchApi, constants.getMetadataUrl, {}, 'GET');
    yield put({
      type: actions.GET_METADATA_SUCCESS,
      response: response.data,
    });
  } catch (error) {
    yield put({
      type: actions.GET_METADATA_FAILURE,
      error,
    });
  }
}
