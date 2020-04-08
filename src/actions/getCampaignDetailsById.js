import actions from './getACampaignDetails';

const getCampaignDetailsById = (campaignId, lastCreatedAt) => ({
  type: actions.GET_CAMPAIGN_DETAILS,
  payload: { campaignId: campaignId, lastRecordCreatedAt: lastCreatedAt },
});

export default getCampaignDetailsById;
