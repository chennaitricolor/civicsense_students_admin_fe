import toastActions from '../actions/toastActions';
import actions from '../actions/getAcceptedEntriesForReport';

const defaultState = {
  reportDetails: '',
  reportDetailsError: '',
  isLoading: false,
};

const getAcceptedEntriesForReport = (state = defaultState, { type, payload }) => {
  switch (type) {
    case actions.GET_ACCEPTED_ENTRIES_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        reportDetails: payload,
      });
    case actions.GET_ACCEPTED_ENTRIES_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        reportDetailsError: payload,
      });
    case toastActions.CLOSE_NOTIFICATION_DIALOG_OR_TOAST_MESSAGE:
      return Object.assign({}, state, {
        isLoading: false,
        reportDetailsError: '',
      });
    default:
      return state;
  }
};

export default getAcceptedEntriesForReport;
