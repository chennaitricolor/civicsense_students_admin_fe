import actions from '../actions/metadataActions';

const defaultState = {
  metadata: {},
  errorMsg: '',
  isLoading: false,
};

const getMetadataReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.GET_METADATA:
      return Object.assign({}, state, { isLoading: true, metadata: {} });
    case actions.GET_METADATA_SUCCESS:
      return Object.assign({}, state, { isLoading: false, metadata: action.response });
    case actions.GET_METADATA_FAILURE:
      return Object.assign({}, state, { isLoading: false, metadata: {}, errorMsg: action.error });
    default:
      return state;
  }
};

export default getMetadataReducer;
