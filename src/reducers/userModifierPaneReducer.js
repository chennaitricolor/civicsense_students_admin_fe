const defaultState = {
    showUserModifierPane: false,
    editableVolunteer: {},
    zoneListing: [],
    zoneWardMapping: [],
    fetchingZoneWardMapping: false,
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
                fetchingZoneWardMapping: false,
            });
        case 'ZONE_LISTING_SUCCESSFUL':
            return Object.assign({}, state, {
                zoneListing: action.payload,
            });
        case 'ZONE_WARD_MAPPING': 
            return Object.assign({}, state, {
                fetchingZoneWardMapping: true,
            })
        case 'ZONE_LISTING': 
            return Object.assign({}, state, {
                zoneListing: [],
                zoneWardMapping: []
            })
        default:
            return state;
    }
};

export default userModifierPaneReducer;
