import { put, call } from 'redux-saga/effects';
import getOTPActions from '../actions/getOTP';
import { callFetchApi } from '../services/api';
import { getOTPUrl } from '../utils/constants';

export default function* getOTP(action) {
  try {
    const response = yield call(callFetchApi, getOTPUrl, { phoneNumber: action.payload.userId }, 'GET');
    if (response.data !== undefined && response.data.success) {
      yield put({
        type: getOTPActions.GET_LOGIN_OTP_SUCCESS,
        response: 'OTP Sent',
      });
    } else {
      yield put({
        type: getOTPActions.GET_LOGIN_OTP_FAILURE,
        response: 'Failed to Generate OTP',
      });
    }
  } catch (e) {
    yield put({
      type: getOTPActions.GET_LOGIN_OTP_FAILURE,
      response: 'Failed to Generate OTP',
    });
  }
}
