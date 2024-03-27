import express from 'express'
import { chatBot } from '../Controllers/chatBotController.js'
const router = express.Router()


router.post('/', chatBot);




export default router