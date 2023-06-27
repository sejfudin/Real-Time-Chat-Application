import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import axiosInstance from '../utils/helpers.js/axios';

export const registerUser = async (userData, navigate) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/user`, userData);
    localStorage.setItem('userInfo', JSON.stringify(data));
    navigate('/chats');
  } catch (error) {
    console.log(error.message);
  }
};

export const loginUser = async (userData, navigate) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/user/login`, userData);
    localStorage.setItem('userInfo', JSON.stringify(data));
    navigate('/chats');
  } catch (error) {
    console.log(error.message);
  }
};

export const searchUser = async (keyword) => {
  try {
    const { data } = await axiosInstance.get(`${BASE_URL}/user?search=${keyword}`);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const logout = () => {
  localStorage.removeItem('userInfo');
};
