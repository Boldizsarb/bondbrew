import express from "express";
import{getUser, updateUser, deleteUser, followUser, UnFollowUser, getAllUsers, fetchUserById, getUserByUsername, resetPassword,getUserByUserName, updatePassword, getUserByFirstName} from "../Controllers/userController.js";
import authMiddleWare from "../middleware/authMiddleware.js";
      
const router = express.Router();

router.get('/:id', getUser)
router.get('/', getAllUsers)
router.put('/:id', authMiddleWare,updateUser)
router.delete('/:id',authMiddleWare, deleteUser)
router.put('/:id/follow',authMiddleWare,followUser)
router.put('/:id/unfollow', authMiddleWare,UnFollowUser)
// auth middlaware used to check if the user is logged in
// forgot password
// there is no need for the authmiddleware in the forgot password
router.post('/username/:username', getUserByUsername) // with the link 
router.get('/resetpassword/:id/:token', resetPassword)
router.get("/username/:username", getUserByUserName)
router.put('/updatepassword/:id', updatePassword)

router.get('/name/:name', getUserByFirstName)
router.get('/fetch/:id', fetchUserById)


export default router;