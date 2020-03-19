import actions from '../actions/getOTP';

const defaultState = {
    generateOTPResponse: null,
};

const getOTPResponse = (state = defaultState, action) => {
    switch (action.type) {
        case actions.GET_LOGIN_OTP_SUCCESS:
            return Object.assign({}, state, { generateOTPResponse: action.response });
        case actions.GET_LOGIN_OTP_FAILURE:
            return Object.assign({}, state, { generateOTPResponse: action.response });
        default:
            return state;
    }
};

export default getOTPResponse;
