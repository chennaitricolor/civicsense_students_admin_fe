import actions from '../actions/approveOrRejectEntries';
import toastActions from '../actions/toastActions';

const defaultState = {
  entrySubmissionMessage: '',
  entrySubmissionError: '',
};

const entrySubmissionReducer = (state = defaultState, { type, response }) => {
  switch (type) {
    case actions.ACCEPT_OR_REJECT_ENTRIES:
      return Object.assign({}, state, {
        entrySubmissionMessage: '',
        entrySubmissionError: '',
      });
    case actions.ACCEPT_OR_REJECT_ENTRIES_SUCCESS:
      return Object.assign({}, state, {
        entrySubmissionMessage: response,
        entrySubmissionError: '',
      });
    case actions.ACCEPT_OR_REJECT_ENTRIES_FAILURE:
      return Object.assign({}, state, {
        entrySubmissionError: response,
      });
    case toastActions.CLOSE_NOTIFICATION_DIALOG_OR_TOAST_MESSAGE:
      return Object.assign({}, state, {
        entrySubmissionMessage: '',
        entrySubmissionError: '',
      });
    default:
      return state;
  }
};

export default entrySubmissionReducer;
