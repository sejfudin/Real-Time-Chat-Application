import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const createAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  return {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
  };
};

export const createChat = async (userId) => {
  try {
    const config = createAuthHeader();

    const { data } = await axios.post(`${BASE_URL}/chat`, { userId }, config);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const fetchChats = async () => {
  try {
    const config = createAuthHeader();
    const { data } = await axios.get(`${BASE_URL}/chat`, config);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const createGroupChat = async (groupData) => {
  try {
    console.log(groupData);
    const config = createAuthHeader();
    const { data } = await axios.post(`${BASE_URL}/chat/group`, groupData, config);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const updateGroupChat = async (groupData) => {
  try {
    const config = createAuthHeader();
    const { data } = await axios.put(`${BASE_URL}/chat/rename`, groupData, config);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const addUserToGroupChat = async (groupData) => {
  try {
    const config = createAuthHeader();
    const { data } = await axios.put(`${BASE_URL}/chat/groupadd`, groupData, config);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const removeUserFromGroupChat = async (groupData) => {
  try {
    const config = createAuthHeader();
    const { data } = await axios.put(`${BASE_URL}/chat/groupremove`, groupData, config);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
