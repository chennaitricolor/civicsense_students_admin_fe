const defaultState = {
    showUserModifierPane: false,
    editableVolunteer: {},
};

const userModifierPaneReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'TOGGLE_USER_MODIFIER_PANE':
            return Object.assign({}, state, {
                showUserModifierPane: action.payload,
            });
        case 'EDIT_VOLUNTEER':
            return Object.assign({}, state, {
                editableVolunteer: action.payload,
            });
        default:
            return state;
    }
};

export default userModifierPaneReducer;
