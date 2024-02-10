import express from "express";
import{getUser, updateUser, deleteUser, followUser, UnFollowUser, getAllUsers, fetchUserById} from "../Controllers/userController.js";
import authMiddleWare from "../middleware/authMiddleware.js";
      
const router = express.Router();

router.get('/:id', getUser)
router.get('/', getAllUsers)
router.put('/:id', authMiddleWare,updateUser)
router.delete('/:id',authMiddleWare, deleteUser)
router.put('/:id/follow',authMiddleWare,followUser)
router.put('/:id/unfollow', authMiddleWare,UnFollowUser)
// auth middlaware used to check if the user is logged in


export default router;