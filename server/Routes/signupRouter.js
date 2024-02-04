import express from 'express';
import { registerUser, loginUser } from '../Controllers/signupController.js'

const router = express.Router();
router.post('/register', registerUser)
router.post('/login', loginUser)

export default router



// 500 server error! how to connect and to wthitch database in mnongo?