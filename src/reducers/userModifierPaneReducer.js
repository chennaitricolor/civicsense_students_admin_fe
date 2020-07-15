const defaultState = {
    showUserModifierPane: false,
    editableVolunteer: {},
    zoneWardMapping: [],
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
        case 'ZONE_WARD_MAPPING_SUCCESSFUL':
            return Object.assign({}, state, {
                zoneWardMapping: action.payload,
            });
        default:
            return state;
    }
};

export default userModifierPaneReducer;
