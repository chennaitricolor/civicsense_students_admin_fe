import axios from 'axios';

export const getVolunteerByNumber = async (payload) => {
    const response = await axios.get(`/hqimsAdmin/api/admin/users/${payload}`);
    return response.data;
};

export const saveVolunteer = async (payload) => {
    const response = await axios.post('/hqimsAdmin/api/admin/users', payload);
    return response.data;
};

export const deleteVolunteer = async (payload) => {
    const response = await axios.delete(`/hqimsAdmin/api/admin/users/${payload}`);
    return response.data;
};

export const getPatientsByVolunteer = async (payload) => {
    const response = await axios.get(`/hqimsAdmin/api/admin/users/${payload}/persons`);
    return response.data;
};

export const transferPatientsToVolunteer = async (payload) => {
    const response = await axios.post(`/hqimsAdmin/api/admin/users/persons/transfer`, payload);
    return response.data;
};

export const getZoneWardMapping = async () => {
    const response = await axios.get(`/hqimsAdmin/api/wards`);
    return response.data;
};