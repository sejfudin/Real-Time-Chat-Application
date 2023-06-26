import axios from 'axios';

export const registerUser = async (userData, navigate) => {
  try {
    const { data } = await axios.post('http://localhost:5000/user', userData);
    localStorage.setItem('userInfo', JSON.stringify(data));
    navigate('/chats');
  } catch (error) {
    console.log(error.message);
  }
};

export const loginUser = async (userData, navigate) => {
  try {
    const { data } = await axios.post('http://localhost:5000/user/login', userData);
    localStorage.setItem('userInfo', JSON.stringify(data));
    navigate('/chats');
  } catch (error) {
    console.log(error.message);
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
    const { data } = await axios.get(`http://localhost:5000/user?search=${keyword}`, config);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const createChat = async (userId) => {
  try {
    const user = JSON.parse(localStorage.getItem('userInfo'));

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };

    const { data } = await axios.post('http://localhost:5000/chat', { userId }, config);
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
    const { data } = await axios.get('http://localhost:5000/chat', config);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
