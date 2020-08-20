export const toggleUserModifierPane = (payload) => ({
    type: 'TOGGLE_USER_MODIFIER_PANE',
    payload,
});

export const editVolunteer = (payload) => ({
    type: 'EDIT_VOLUNTEER',
    payload,
});

export const getZoneListing = (payload) => ({
    type: 'ZONE_LISTING',
    payload,
});

export const getZoneListingSuccessful = (payload) => ({
    type: 'ZONE_LISTING_SUCCESSFUL',
    payload,
});

export const getZoneListingFailed = (payload) => ({
    type: 'ZONE_LISTING_FAILED',
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
