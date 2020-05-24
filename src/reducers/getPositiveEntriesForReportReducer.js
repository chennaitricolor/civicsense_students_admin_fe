import toastActions from '../actions/toastActions';
import actions from '../actions/getPositiveEntriesForReport';

const defaultState = {
  positiveDetails: null,
  positiveDetailsError: null,
  isLoading: false,
};

const getPositiveEntriesForReportReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case actions.GET_POSITIVE_ENTRIES_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        positiveDetails: payload,
      });
    case actions.GET_POSITIVE_ENTRIES_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        positiveDetailsError: payload,
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

export default getPositiveEntriesForReportReducer;
