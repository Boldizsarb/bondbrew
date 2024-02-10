import axios from "axios";

const url = process.env.AXIOUS_URL
const API = axios.create({ baseURL: url });

API.interceptors.request.use((req) => { // jwt token for the user
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
  });

export const getUser = (userId) => API.get(`/userser/${userId}`);
export const updateUser = (id, formData) =>  API.put(`/userser/${id}`, formData); // from the modal
export const getAllUser = ()=> API.get('/userser')
export const followUser = (id,data)=> API.put(`/userser/${id}/follow`, data)
export const unfollowUser = (id, data)=> API.put(`/userser/${id}/unfollow`, data)


