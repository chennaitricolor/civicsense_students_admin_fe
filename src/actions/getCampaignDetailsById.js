import actions from './getACampaignDetails';

const getCampaignDetailsById = (campaignId) => (
    {
        type: actions.GET_CAMPAIGN_DETAILS,
        payload: { campaignId: campaignId },
    });

export default getCampaignDetailsById;