import toastActions from '../actions/toastActions';
import actions from '../actions/getAllEntriesForReport';

const defaultState = {
  reportDetails: '',
  reportDetailsError: '',
  isLoading: false,
};

const getAllEntriesForReportReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case actions.GET_ALL_ENTRIES_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        reportDetails: payload,
      });
    case actions.GET_ALL_ENTRIES_FAILURE:
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

export default getAllEntriesForReportReducer;
