import actions from './approveOrRejectEntries';

const submitEntries = (entryId, payload) => ({
    type: actions.ACCEPT_OR_REJECT_ENTRIES,
    entryId: entryId,
    payload: payload
});

export default submitEntries;