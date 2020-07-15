import axios from 'axios';

export const getVolunteerByNumber = async (payload) => {
    const response = await axios.get(`http://localhost:8080/api/users/${payload}`);
    return response.data;
};

export const saveVolunteer = async (payload) => {
    const response = await axios.post('http://localhost:8080/api/users', payload);
    return response.data;
};

export const deleteVolunteer = async (payload) => {
    const response = await axios.delete(`http://localhost:8080/api/users/${payload}`);
    return response.data;
};

export const getPatientsByVolunteer = async (payload) => {
    const response = await axios.get(`http://localhost:8080/api/users/${payload}/persons`);
    return response.data;
};

export const transferPatientsToVolunteer = async (payload) => {
    const response = await axios.post(`http://localhost:8080/api/users/persons/transfer`, payload);
    return response.data;
};

export const getZoneWardMapping = async () => {
    const response = await axios.get(`http://localhost:8080/api/wards`);
    return response.data;
};
