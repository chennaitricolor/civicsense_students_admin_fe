const defaultState = {
    volunteer: {},
    fetchingVolunteer: false,
    fetchedVolunteer: false,
    errorFetchingVolunteer: '',
    transferVolunteer: {
        name: 'Jaden Smith',
        number: '9574892759',
        zone: 'Sholinganallur',
        ward: '12',
    },
    fetchingTransferVolunteer: false,
    fetchedTransferVolunteer: false,
    errorFetchingTransferVolunteer: '',
    patients: [{
        id: '8847759385',
        name: 'John Doe',
        number: '8847759385',
        isolationType: 'Travel',
        daysRemaining: '5',
    }, {
        id: '8847759685',
        name: 'James',
        number: '8847759685',
        isolationType: 'Travel',
        daysRemaining: '7',
    }],
    fetchingPatients: false,
    fetchedPatients: false,
    errorFetchingPatients: '',
};

const userManagementReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SEARCH_VOLUNTEER_BY_NUMBER':
            return Object.assign({}, state, {
                volunteer: {},
                fetchingVolunteer: true,
                fetchedVolunteer: false,
                errorFetchingVolunteer: '',
            });
        case 'SEARCH_VOLUNTEER_BY_NUMBER_SUCCESSFUL':
            return Object.assign({}, state, {
                volunteer: action.payload,
                fetchingVolunteer: false,
                fetchedVolunteer: true,
                errorFetchingVolunteer: '',
            });
        case 'SEARCH_VOLUNTEER_BY_NUMBER_FAILED':
            return Object.assign({}, state, {
                volunteer: {},
                fetchingVolunteer: false,
                fetchedVolunteer: true,
                errorFetchingVolunteer: action.payload,
            });
        case 'DELETE_VOLUNTEER':
            return Object.assign({}, state, {});
        case 'DELETE_VOLUNTEER_SUCCESSFUL':
            return Object.assign({}, state, {
                volunteer: {},
                fetchingVolunteer: false,
                fetchedVolunteer: true,
                errorFetchingVolunteer: '',
            });
        case 'DELETE_VOLUNTEER_FAILED':
            return Object.assign({}, state, {});
        case 'FETCH_TRANSFER_VOLUNTEER':
            return Object.assign({}, state, {
                transferVolunteer: {},
                fetchingTransferVolunteer: true,
                fetchedTransferVolunteer: false,
                errorFetchingTransferVolunteer: '',
            });
        case 'FETCH_TRANSFER_VOLUNTEER_SUCCESSFUL':
            return Object.assign({}, state, {
                transferVolunteer: action.payload,
                fetchingTransferVolunteer: false,
                fetchedTransferVolunteer: true,
                errorFetchingTransferVolunteer: '',
            });
        case 'FETCH_TRANSFER_VOLUNTEER_FAILED':
            return Object.assign({}, state, {
                transferVolunteer: {},
                fetchingVolunteer: false,
                fetchedVolunteer: true,
                errorFetchingTransferVolunteer: action.payload,
            });
        case 'FETCH_PATIENTS_FOR_VOLUNTEER':
            return Object.assign({}, state, {
                patients: [],
                fetchingPatients: true,
                fetchedPatients: false,
                errorFetchingPatients: '',
            });
        case 'FETCH_PATIENTS_FOR_VOLUNTEER_SUCCESSFUL':
            return Object.assign({}, state, {
                patients: action.payload,
                fetchingPatients: false,
                fetchedPatients: true,
                errorFetchingPatients: '',
            });
        case 'FETCH_PATIENTS_FOR_VOLUNTEER_FAILED':
            return Object.assign({}, state, {
                patients: [],
                fetchingPatients: false,
                fetchedPatients: true,
                errorFetchingPatients: action.payload,
            });
        default:
            return state;
    }
};

export default userManagementReducer;
