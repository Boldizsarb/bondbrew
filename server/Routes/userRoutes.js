import express from "express";
import{getUser, updateUser, deleteUser, followUser, UnFollowUser, getAllUsers, fetchUserById} from "../Controllers/userController.js";
      
const router = express.Router();

router.get('/:id', getUser)
router.get('/', getAllUsers)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
router.put('/:id/follow', followUser)
router.put('/:id/unfollow', UnFollowUser)

router.get("/getUser", fetchUserById) // by id from the body
export default router;