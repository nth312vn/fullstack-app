import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import jwtDecode from 'jwt-decode';

const token = 'eerwer';
const baseURL = 'http://localhost:5000/';
const axiosClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: true,
  },
});
const refeshToken = async () => {
  const tokenDecoded = jwtDecode(token);
};
axiosClient.interceptors.request.use((request: AxiosRequestConfig) => {
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});
axiosClient.interceptors.response.use((response: AxiosResponse) => {
  if (response.status === 401) {
    refeshToken();
  }
  return response;
});
export default axiosClient;

export const getRequest = <T>(url: string, body?: T) => {
  if (body) {
    JSON.stringify(body);
    return axiosClient.get(url, {
      data: body,
    });
  }
  return axiosClient.get(url);
};
export const postRequest = <T>(url: string, body?: T) => {
  if (body) {
    JSON.stringify(body);
    return axiosClient.post(url, {
      data: body,
    });
  }
  return axiosClient.post(url);
};
