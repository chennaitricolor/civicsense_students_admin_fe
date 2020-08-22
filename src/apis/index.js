import axios from 'axios';

const region = localStorage.getItem('region');

const axiosInstance = axios.create({
    headers: {
        region: region,
    },
})

export const getVolunteerByNumber = async (payload) => {
    const response = await axiosInstance.get(`/hqimsAdmin/api/admin/users/${payload}`);
    return response.data;
};

export const saveVolunteer = async (payload) => {
    if (!payload.id) {
      const isDuplicateVolunteer = await getVolunteerByNumber(payload.login);
      if (isDuplicateVolunteer) {
        const error = new Error('Volunteer already exists');
        error.statusCode = 409;
        throw error;
      }
    }
    const response = await axiosInstance.post('/hqimsAdmin/api/admin/users', payload);
    return response.data;
};

export const deleteVolunteer = async (payload) => {
    const response = await axiosInstance.delete(`/hqimsAdmin/api/admin/users/${payload}`);
    return response.data;
};

export const getPatientsByVolunteer = async (payload) => {
    const response = await axiosInstance.get(`/hqimsAdmin/api/admin/users/${payload}/persons`);
    return response.data;
};

export const transferPatientsToVolunteer = async (payload) => {
    const response = await axiosInstance.post(`/hqimsAdmin/api/admin/users/persons/transfer`, payload);
    return response.data;
};

export const getZoneWardMapping = async (payload) => {
    const response = await axiosInstance.get(`/hqimsAdmin/api/wards/${payload}`);
    return response.data;
};

export const getZoneListing = async (payload) => {
    const response = await axiosInstance.get(`/hqimsAdmin/api/zones/${payload}`);
    return response.data;
};
