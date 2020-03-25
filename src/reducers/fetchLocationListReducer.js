import actions from '../actions/fetchLocationList';
import toastActions from '../actions/toastActions';

const defaultState = {
  locationList: [],
  isLoading: false,
};

const fetchLocationListReducer = (state = defaultState, { type, response }) => {
  let locationList = [];
  switch (type) {
    case actions.FETCH_LOCATION_LIST:
      return Object.assign({}, state, {
        isLoading: true,
        liveCampaigns: response,
      });
    case actions.FETCH_LOCATION_LIST_SUCCESS:
      locationList.push({ label: 'GCC', value: 'all' });
      response.forEach(location => {
        locationList.push({ label: location.locationNm, value: location._id });
      });
      return Object.assign({}, state, {
        locationList: locationList,
        isLoading: false,
      });
    case toastActions.CLOSE_NOTIFICATION_DIALOG_OR_TOAST_MESSAGE:
      return Object.assign({}, state, {
        isLoading: false,
        liveCampaignsError: '',
      });
    default:
      return state;
  }
};

export default fetchLocationListReducer;
