import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:5000' }); // ever request will have this url

export const logIn= (formData)=> API.post('/user/login',formData);

export const signUp = (formData) => API.post('/user/register', formData);