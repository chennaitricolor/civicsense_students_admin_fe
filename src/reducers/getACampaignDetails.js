import actions from '../actions/getACampaignDetails';
import toastActions from "../actions/toastActions";

const defaultState = {
    campaignDetails: '',
    campaignDetailsError: '',
    isLoading: false,
};

const getACampaignDetailsResponse = (state = defaultState, { type, payload }) => {
    switch (type) {
        case actions.GET_CAMPAIGN_DETAILS:
            return Object.assign({}, state, {
                isLoading: true,
                campaignDetails: payload,
            });
        case actions.GET_CAMPAIGN_DETAILS_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                campaignDetails: payload,
            });
        case actions.GET_CAMPAIGN_DETAILS_FAILURE:
            return Object.assign({}, state, {
                isLoading: false,
                campaignDetailsError: payload,
            });
        case toastActions.CLOSE_NOTIFICATION_DIALOG_OR_TOAST_MESSAGE:
            return Object.assign({}, state, {
                isLoading: false,
                campaignDetailsError: '',
            });
        default:
            return state;
    }
};

export default getACampaignDetailsResponse;
