import actions from '../actions/login';

const defaultState = {
  success: false,
  persona: '',
  region: '',
};

const loginResponse = (state = defaultState, action) => {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return Object.assign({}, state, { ...action.payload });
    case actions.LOGIN_FAILURE:
      return Object.assign({}, state, { success: false, persona: '', region: '' });
    default:
      return state;
  }
};

export default loginResponse;
