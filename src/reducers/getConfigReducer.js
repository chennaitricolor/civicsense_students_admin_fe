import actions from '../actions/configActions';

const defaultState = {
  config: null,
  errorMsg: '',
};

const getConfigReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.GET_CONFIG_SUCCESS:
      return Object.assign({}, state, { config: action.response });
    case actions.GET_CONFIG_FAILURE:
      return Object.assign({}, state, { errorMsg: action.error });
    default:
      return state;
  }
};

export default getConfigReducer;
