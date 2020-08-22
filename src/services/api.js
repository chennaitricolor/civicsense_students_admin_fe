import axios from 'axios';

function callFetchAxios(endpoint, params, method, reqbody = {}, isHeaderRegionRequired = false) {
  let axiosInstance;
  if (isHeaderRegionRequired) {
    const region = localStorage.getItem('region');
    axiosInstance = axios.create({
      headers: {
        'Content-Type': 'application/json',
        region: region,
      },
    });
  } else {
    axiosInstance = axios.create({
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  switch (method) {
    case 'GET':
      return axiosInstance
        .get(endpoint, {
          params,
        })
        .then(response => response)
        .catch(error => {
          throw error;
        });
    case 'POST':
      return axiosInstance
        .post(endpoint, reqbody)
        .then(response => response)
        .catch(error => error);
    case 'PUT':
      return axiosInstance
        .put(endpoint, reqbody)
        .then(response => response)
        .catch(error => error);
    case 'DELETE':
      return axiosInstance
        .delete(endpoint)
        .then(response => response)
        .catch(response => response);
    default:
      return '';
  }
}

export const callFetchApi = (...params) => callFetchAxios(...params);

export default callFetchApi;
