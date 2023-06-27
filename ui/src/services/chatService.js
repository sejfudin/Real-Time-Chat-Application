import { BASE_URL } from '../utils/constants';
import axiosInstance from '../utils/helpers.js/axios';

export const createChat = async (userId) => {
  try {
    const { data } = await axiosInstance.post(`${BASE_URL}/chat`, { userId });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchChats = async () => {
  try {
    const { data } = await axiosInstance.get(`${BASE_URL}/chat`);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const createGroupChat = async (groupData) => {
  try {
    const { data } = await axiosInstance.post(`${BASE_URL}/chat/group`, groupData);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const updateGroupChat = async (groupData) => {
  try {
    const { data } = await axiosInstance.put(`${BASE_URL}/chat/rename`, groupData);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const addUserToGroupChat = async (groupData) => {
  try {
    const { data } = await axiosInstance.put(`${BASE_URL}/chat/groupadd`, groupData);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const removeUserFromGroupChat = async (groupData) => {
  try {
    const { data } = await axiosInstance.put(`${BASE_URL}/chat/groupremove`, groupData);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
