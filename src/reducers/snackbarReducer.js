const defaultState = {
    variant: 'info',
    message: '',
    open: false,
};

export default function snackbarReducer(state = defaultState, action) {
    switch (action.type) {
        case 'SHOW_SNACKBAR':
            return {
                ...state,
                variant: action.payload.variant,
                message: action.payload.message,
                open: true,
            };
        case 'HIDE_SNACKBAR':
            return {
                ...state,
                message: '',
                open: false,
            };
        default:
            return state;
    }
}
