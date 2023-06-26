import axios from 'axios';
import { BASE_URL } from '../utils/constants';

export const createChat = async (userId) => {
  try {
    const user = JSON.parse(localStorage.getItem('userInfo'));

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };

    const { data } = await axios.post(`${BASE_URL}/chat`, { userId }, config);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchChats = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.get(`${BASE_URL}/chat`, config);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const createGroupChat = async (groupData) => {
  try {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.post(`${BASE_URL}/chat/group`, groupData, config);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const updateGroupChat = async (groupData) => {
  try {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.put(`${BASE_URL}/chat/rename`, groupData, config);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const addUserToGroupChat = async (groupData) => {
  try {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.put(`${BASE_URL}/chat/groupadd`, groupData, config);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const removeUserFromGroupChat = async (groupData) => {
  try {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.put(`${BASE_URL}/chat/groupremove`, groupData, config);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
