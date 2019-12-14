import actions from '../actions/getAllCampaignsList';

const defaultState = {
  liveCampaigns: '',
  liveCampaignsError: '',
  isLoading: false,
};

const getAllCampaignsResponse = (state = defaultState, { type, payload }) => {
  switch (type) {
    case actions.GET_ALL_CAMPAIGNS_LIST:
      return Object.assign({}, state, {
        isLoading: true,
        liveCampaigns: payload,
      });
    case actions.GET_ALL_CAMPAIGNS_LIST_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        liveCampaigns: payload,
      });
    case actions.GET_ALL_CAMPAIGNS_LIST_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        liveCampaignsError: payload,
      });
    default:
      return state;
  }
};

export default getAllCampaignsResponse;
