import actions from '../actions/getACampaignDetails';

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
                campaignDetails: payload.campaignDetails,
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
        default:
            return state;
    }
};

export default getACampaignDetailsResponse;
