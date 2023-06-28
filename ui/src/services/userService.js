import axios from 'axios';
import { BASE_URL } from '../utils/constants';

export const registerUser = async (userData, navigate, toast) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/user`, userData);
    localStorage.setItem('userInfo', JSON.stringify(data));
    navigate('/chats');
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const loginUser = async (userData, navigate) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/user/login`, userData);
    localStorage.setItem('userInfo', JSON.stringify(data));
    navigate('/chats');
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const searchUser = async (keyword) => {
  try {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.get(`${BASE_URL}/user?search=${keyword}`, config);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const logout = () => {
  localStorage.removeItem('userInfo');
};
