import { BASE_URL } from '../utils/constants';
import axiosInstance from '../utils/helpers.js/axios';

export const messageSend = async (message) => {
  try {
    const { data } = await axiosInstance.post(`${BASE_URL}/message`, message);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getMessages = async (chatId) => {
  try {
    const { data } = await axiosInstance.get(`${BASE_URL}/message/${chatId}`);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
