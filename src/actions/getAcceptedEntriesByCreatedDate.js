import actions from './getAcceptedEntriesForReport';

const getAcceptedEntriesForReport = (lastCreatedAt, applyLimit, campaignId) => ({
  type: actions.GET_ACCEPTED_ENTRIES,
  payload: { lastRecordCreatedAt: lastCreatedAt, applyLimit: applyLimit, campaignId: campaignId },
});

export default getAcceptedEntriesForReport;
