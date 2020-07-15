export const toggleUserModifierPane = (payload) => ({
    type: 'TOGGLE_USER_MODIFIER_PANE',
    payload,
});

export const editVolunteer = (payload) => ({
    type: 'EDIT_VOLUNTEER',
    payload,
});

export const getZoneWardMapping = (payload) => ({
    type: 'ZONE_WARD_MAPPING',
    payload,
});

export const getZoneWardMappingSuccessful = (payload) => ({
    type: 'ZONE_WARD_MAPPING_SUCCESSFUL',
    payload,
});

export const getZoneWardMappingFailed = (payload) => ({
    type: 'ZONE_WARD_MAPPING_FAILED',
    payload,
});

export const saveVolunteer = (payload) => ({
    type: 'SAVE_VOLUNTEER',
    payload,
});
