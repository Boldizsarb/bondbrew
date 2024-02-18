import axios from 'axios'

const url = process.env.AXIOUS_URL

const API = axios.create({ baseURL: url });


export const logIn= (formData)=> API.post('/user/login',formData);

export const signUp = (formData) => API.post('/user/register', formData);

export const forgotPassword = (formData) => API.post('/user/forgotPassword', formData);

// user/forgotPassword is the api, and the formData is the data that is being sent to the api

export const resetPassword = (id, token,) => API.get(`/resetpassword/${id}/${token}`);