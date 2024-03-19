import express from 'express'
import { createChat, findChat, userChats, deleteChat, findChatById} from '../Controllers/chatController.js';
const router = express.Router()

router.post('/', createChat);
router.delete('/delete', deleteChat);
router.get('/:userId', userChats);
router.get('/find/:firstId/:secondId', findChat);
router.get('/find/:id', findChatById);

export default router