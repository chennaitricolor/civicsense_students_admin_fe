import actions from '../actions/GetDashboardEmbedAction';
import toastActions from '../actions/toastActions';

const defaultState = {
    dashboardEmbedUrl: undefined,
    dashboardEmbedUrlError: '',
    isLoading: false,
};

const getDashboardEmbedReducer = (state = defaultState, { type, payload }) => {
    switch (type) {
        case actions.GET_DASHBOARD_EMBED_URL:
            return Object.assign({}, state, {
                isLoading: true,
                dashboardEmbedUrl: payload,
            });
        case actions.GET_DASHBOARD_EMBED_URL_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                dashboardEmbedUrl: payload,
            });
        case actions.GET_DASHBOARD_EMBED_URL_FAILURE:
            return Object.assign({}, state, {
                isLoading: false,
                dashboardEmbedUrlError: payload,
            });
        case toastActions.CLOSE_NOTIFICATION_DIALOG_OR_TOAST_MESSAGE:
            return Object.assign({}, state, {
                isLoading: false,
                dashboardEmbedUrlError: '',
            });
        default:
            return state;
    }
};

export default getDashboardEmbedReducer;
