import axios from "axios";


const url = process.env.AXIOUS_URL // will need to change it since it doesn exist
const API = axios.create({ baseURL: url });

export const userChats = async (id) => API.get (`/chat/${id}`) // the id is being sent from chat.jsx as user._id 
                                                           // which is: const { data } = await userChats(user._id); 