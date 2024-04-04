import express from "express";
import{getUser, updateUser, deleteUser, followUser, UnFollowUser, getAllUsers, fetchUserById, getUserByUsername, resetPassword,getUserByUserName,
     updatePassword, getUserByFirstName, getUserInterests, updateInterests, updateLocation} from "../Controllers/userController.js";
import authMiddleWare from "../middleware/authMiddleware.js";
      
const router = express.Router();


router.get('/', getAllUsers)
router.post('/interests', getUserInterests)
router.put('/locationupdate',updateLocation) // update
router.put("/interestupdate",updateInterests) // update
router.get('/:id', getUser)
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

/// Swagger Annotiations   /// Swagger Annotiations   /// Swagger Annotiations   /// Swagger Annotiations
/// Schema for the user object
/**
 * @swagger
 * components:
 *  schemas:
 *    Users:
 *      type: object
 *      required:
 *        - username
 *        - password
 *        - firstname
 *        - lastname
 *      properties:
 *        username:
 *          type: string
 *          description: The email-address of the user
 *        password:
 *          type: string
 *          description: The password of the user
 *        firstname:
 *          type: string
 *          description: The firstname of the user
 *        lastname:
 *          type: string
 *          description: The lastname of the user
 *        isAdmin:
 *          type: boolean
 *          description: The admin status of the user
 *        profilePicture:
 *          type: string
 *          description: The profile picture of the user from the server
 *        coverPicture:
 *          type: string
 *          description: The cover picture of the user
 *        about:
 *          type: string
 *          description: The about of the user
 *        livesin:
 *          type: string
 *          description: The location of the user
 *        worksAt:
 *          type: string
 *          description: The workplace of the user
 *        country:
 *          type: string
 *          description: The country of the user
 *        relationship:
 *          type: string
 *          description: The relationship status of the user
 *        mostinterestedin:
 *          type: string
 *          description: The interest of the user
 *        hobbies:
 *          type: string
 *          description: The hobbies of the user
 *      example:
 *        username: user
 *        password: password
 *        firstname: user
 *        lastname: user
 *        isAdmin: false
 *        profilePicture: /images/user.jpg
 *        coverPicture: /images/user.jpg
 *        about: about me
 *        livesin: location
 *        worksAt: workplace
 *        country: country
 *        relationship: relationship
 *        mostinterestedin: interest
 *        hobbies: hobbies
 */
/// Tags for the user object
/**
 * @swagger
 * tags:
 *  name: Users
 *  description: The users managing API (Restricted due to sensitive data)
 */

// GET USERS // GET USERS // GET USERS

/**
 * @swagger
 * /userser/:
 *  get:
 *    summary: Returns the list of all the users
 *    tags: [Users]
 *    responses:
 *      200:
 *        description: The list of the users
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Users'
 *      400:
 *        description: Bad request
 *      500: 
 *        description: Internal server error 
 */

// GET USERS INTERESTS // GET USERS INTERESTS // GET USERS INTERESTS

/**
 * @swagger
 * /userser/interests:
 *  post:
 *    summary: Returns the list of all the user interests
 *    tags: [Users]
 *    requestBody:
 *        required: true
 *        content:
 *             application/json:
 *                  schema:
 *                       type: object
 *                       required:
 *                            - _id
 *                       properties:    
 *                            _id:
 *                                 type: string
 *                                 example: 65d21151d5ebad6dcf7defe9
 *    responses:
 *      200:
 *        description: The list of the users interests
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: string
 *      400:
 *        description: Bad request
 *      500: 
 *        description: Internal server error 
 */


export default router

