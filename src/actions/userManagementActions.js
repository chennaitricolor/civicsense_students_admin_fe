export const searchVolunteerByNumber = (payload) => ({
    type: 'SEARCH_VOLUNTEER_BY_NUMBER',
    payload,
});

export const searchVolunteerByNumberSuccessful = (payload) => ({
    type: 'SEARCH_VOLUNTEER_BY_NUMBER_SUCCESSFUL',
    payload,
});

export const searchVolunteerByNumberFailed = (payload) => ({
    type: 'SEARCH_VOLUNTEER_BY_NUMBER_FAILED',
    payload,
});

export const deleteVolunteer = (payload) => ({
    type: 'DELETE_VOLUNTEER',
    payload,
});

export const deleteVolunteerSuccessful = (payload) => ({
    type: 'DELETE_VOLUNTEER_SUCCESSFUL',
    payload,
});

export const deleteVolunteerFailed = (payload) => ({
    type: 'DELETE_VOLUNTEER_FAILED',
    payload,
});

export const fetchTransferVolunteer = (payload) => ({
    type: 'FETCH_TRANSFER_VOLUNTEER',
    payload,
});

export const fetchTransferVolunteerSuccessful = (payload) => ({
    type: 'FETCH_TRANSFER_VOLUNTEER_SUCCESSFUL',
    payload,
});

export const fetchTransferVolunteerFailed = (payload) => ({
    type: 'FETCH_TRANSFER_VOLUNTEER_FAILED',
    payload,
});

export const fetchPatientsForVolunteer = (payload) => ({
    type: 'FETCH_PATIENTS_FOR_VOLUNTEER',
    payload,
});

export const fetchPatientsForVolunteerSuccessful = (payload) => ({
    type: 'FETCH_PATIENTS_FOR_VOLUNTEER_SUCCESSFUL',
    payload,
});

export const fetchPatientsForVolunteerFailed = (payload) => ({
    type: 'FETCH_PATIENTS_FOR_VOLUNTEER_FAILED',
    payload,
});
