import axios from 'axios';
import { BASE_URL } from '../constants';
const user = JSON.parse(localStorage.getItem('userInfo'));

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {},
  headers: { 'Content-type': 'application/json', Authorization: `Bearer ${user.token}` },
});

export default axiosInstance;
