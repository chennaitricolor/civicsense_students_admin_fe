import actions from '../actions/createCampaign';
import toastActions from '../actions/toastActions';

const defaultState = {
  createCampaignMessage: '',
  createCampaignError: '',
};

const createCampaignReducer = (state = defaultState, { type, response }) => {
  switch (type) {
    case actions.CREATE_CAMPAIGN:
      return Object.assign({}, state, {
        createCampaignMessage: '',
        createCampaignError: '',
      });
    case actions.CREATE_CAMPAIGN_SUCCESS:
      return Object.assign({}, state, {
        createCampaignMessage: response,
        createCampaignError: '',
      });
    case actions.CREATE_CAMPAIGN_FAILURE:
      return Object.assign({}, state, {
        createCampaignError: response,
      });
    case toastActions.CLOSE_NOTIFICATION_DIALOG_OR_TOAST_MESSAGE:
      return Object.assign({}, state, {
        createCampaignMessage: '',
        createCampaignError: '',
      });
    default:
      return state;
  }
};

export default createCampaignReducer;
