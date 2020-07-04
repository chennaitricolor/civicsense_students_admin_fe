import actions from '../actions/login';

const defaultState = {
  success: false,
  persona: '',
  region: '',
  inProgress: false,
};

const loginResponse = (state = defaultState, action) => {
  switch (action.type) {
    case actions.INITIATE_LOGIN:
      return Object.assign({}, state, { inProgress: true });
    case actions.LOGIN_SUCCESS:
      localStorage.setItem('persona', action.payload.persona);
      localStorage.setItem('region', action.payload.region);
      return Object.assign({}, state, { ...action.payload, inProgress: false });
    case actions.LOGIN_FAILURE:
      return Object.assign({}, state, { success: false, persona: '', region: ', inProgress: false,' });
    default:
      return state;
  }
};

export default loginResponse;
