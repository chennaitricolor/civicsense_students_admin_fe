import actions from '../actions/getAllCampaignsList';
import toastActions from '../actions/toastActions';

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
    case toastActions.CLOSE_NOTIFICATION_DIALOG_OR_TOAST_MESSAGE:
      return Object.assign({}, state, {
        isLoading: false,
        liveCampaignsError: '',
      });
    default:
      return state;
  }
};

export default getAllCampaignsResponse;
