import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const createAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  return {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
};

export const messageSend = async (message) => {
  try {
    const config = createAuthHeader();
    const { data } = await axios.post(`${BASE_URL}/message`, message, config);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getMessages = async (chatId) => {
  try {
    const config = createAuthHeader();
    const { data } = await axios.get(`${BASE_URL}/message/${chatId}`, config);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
