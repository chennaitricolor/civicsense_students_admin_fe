import { takeLatest, takeEvery, put, call } from 'redux-saga/effects';
import {
    getVolunteerByNumber, getPatientsByVolunteer, saveVolunteer,
    transferPatientsToVolunteer, deleteVolunteer, getZoneWardMapping, getZoneListing
} from '../apis';
import {
    searchVolunteerByNumberSuccessful, searchVolunteerByNumberFailed,
    fetchPatientsForVolunteer, fetchPatientsForVolunteerSuccessful, fetchPatientsForVolunteerFailed,
    fetchTransferVolunteerSuccessful, fetchTransferVolunteerFailed,
    deleteVolunteerSuccessful, deleteVolunteerFailed,
} from '../actions/userManagementActions';
import { getZoneWardMappingSuccessful, getZoneWardMappingFailed, getZoneListingSuccessful, getZoneListingFailed } from '../actions/userModifierPaneActions';
import { showSnackbar } from '../actions/snackbarAction';

export function* workerGetVolunteerByNumberSaga(action) {
    try {
        const response = yield call(getVolunteerByNumber, action.payload);
        if (response) {
            yield put(searchVolunteerByNumberSuccessful(response));
            yield put(fetchPatientsForVolunteer(response.id));
            yield put(showSnackbar({ variant: 'success', message: `Volunteer Found` }));
        }
        else {
            yield put(showSnackbar({ variant: 'warning', message: `Volunteer Not Found` }));
            yield put(searchVolunteerByNumberFailed());
    };
    } catch (error) {
        yield put(searchVolunteerByNumberFailed(error));
        yield put(showSnackbar({ variant: 'error', message: `An error occurred while fetching volunteer` }));
    }
}

export function* workerGetTransferVolunteerSaga(action) {
    try {
        const response = yield call(getVolunteerByNumber, action.payload);
        if (response) {
            yield put(fetchTransferVolunteerSuccessful(response));
            yield put(showSnackbar({ variant: 'success', message: `Transfer Volunteer Found` }));
        }
        else yield put(showSnackbar({ variant: 'warning', message: `Transfer Volunteer Not Found` }));
    } catch (error) {
        yield put(fetchTransferVolunteerFailed(error));
        yield put(showSnackbar({ variant: 'error', message: `An error occurred while fetching volunteer` }));
    }
}

export function* workerGetPatientsByVolunteerSaga(action) {
    try {
        const response = yield call(getPatientsByVolunteer, action.payload);
        yield put(fetchPatientsForVolunteerSuccessful(response));
        yield put(showSnackbar({ variant: 'success', message: `Patients Fetched` }));
    } catch (error) {
        yield put(fetchPatientsForVolunteerFailed(error));
        yield put(showSnackbar({ variant: 'error', message: `An error occurred while fetching patients` }));
    }
}

export function* workerSaveVolunteerSaga(action) {
    try {
        const response = yield call(saveVolunteer, action.payload);
        yield put(showSnackbar({ variant: 'success', message: `Volunteer Changes Saved` }));
    } catch (error) {
        if (error.response.status === 409) {
            yield put(showSnackbar({ variant: 'error', message: error.response.data.message }));
        } else {
            yield put(showSnackbar({ variant: 'error', message: `An error occurred while saving volunteer changes` }));
        }
    }
}

export function* workerTransferPatientsToVolunteerSaga(action) {
    try {
        const response = yield call(transferPatientsToVolunteer, action.payload);
        yield put(showSnackbar({ variant: 'success', message: `Transfer Successful` }));
        yield put(fetchPatientsForVolunteer(action.payload.fromId));
    } catch (error) {
        yield put(showSnackbar({ variant: 'error', message: `An error occurred while transferring` }));
    }
}

export function* workerDeleteVolunteerSaga(action) {
    try {
        const response = yield call(deleteVolunteer, action.payload);
        yield put(showSnackbar({ variant: 'success', message: `Volunteer Deleted Successfully` }));
        yield put(deleteVolunteerSuccessful());
    } catch (error) {
        yield put(deleteVolunteerFailed(error));
        yield put(showSnackbar({ variant: 'error', message: `An error occurred while deleting volunteer` }));
    }
}

export function* workerGetZoneWardMappingSaga(action) {
    try {
        const response = yield call(getZoneWardMapping, action.payload);
        yield put(getZoneWardMappingSuccessful(response));
    } catch (error) {
        yield put(getZoneWardMappingFailed(error));
    }
}

export function* workerGetZoneListingSaga(action) {
    try {
        const response = yield call(getZoneListing, action.payload);
        yield put(getZoneListingSuccessful(response));
    } catch (error) {
        yield put(getZoneListingFailed(error));
    }
}

