import axios from 'axios';
export const registerUser = (userData, navigate) => {
  axios
    .post('http://localhost:5000/user', userData)
    .then((res) => navigate('/chats')) // re-direct to login on successful register
    .catch((err) => console.log(err.message));
};

export const loginUser = (userData) => {
  axios
    .post('http://localhost:5000/user/login', userData)
    .then((res) => console.log(res))
    .catch((err) => console.log(err.message));
};
