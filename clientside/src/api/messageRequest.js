import axios from 'axios'

const url = process.env.AXIOUS_URL
const API = axios.create({ baseURL: url });

export const getMessages = (id) => API.get(`/message/${id}`);

export const addMessage = (data) => API.post('/message/', data); // chatbox.jsx