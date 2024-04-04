import express from "express";
import { createPost, getPost, updatePost, deletePost, likePost, getTimelinePosts } from "../Controllers/postsController.js";
const router = express.Router()

router.post('/', createPost)
router.get('/:id', getPost)
router.put('/:id', updatePost)
router.delete("/:id", deletePost)
router.put("/:id/like", likePost)
router.get("/:id/timeline", getTimelinePosts)


/// Swagger Annotiations   /// Swagger Annotiations   /// Swagger Annotiations   /// Swagger Annotiations
/// Schema for the post object
/**
 * @swagger
 * components:
 *  schemas:
 *    Posts:
 *      type: object
 *      required:
 *        - userId
 *        - desc
 *        - img
 *        - sharedby
 *        - likes
 *      properties:
 *        userId:
 *          type: string
 *          description: The user who created the post
 *        desc:
 *          type: string
 *          description: The description of the post
 *        img:
 *          type: string
 *          description: The image of the post that will be retrieved in the server 
 *        likes:
 *          type: array
 *          description: The number of likes of the post
 *        sharedby:
 *          type: string
 *          description: The user who shared the post
 *      example:
 *        userId: 123456
 *        desc: This is a post
 *        img: /images/123456.jpg
 *        likes: [123456, 123456]
 *        sharedby: 123456
 */

/// Tags for the post object
/**
 * @swagger
 * tags:
 *  name: Posts
 *  description: The postS managing API
 */

// GET POST BY ID // GET POST BY ID // GET POST BY ID

/**
 * @swagger
 * /post/{id}:
 *  get:
 *    summary: Get a post by ID
 *    tags: [Posts]
 *    description: Get a post by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The post ID
 *        example: 65c77a92d5daf53f90dfbbb0 
 *    responses:
 *      200:
 *        description: The post description by ID
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Posts'
 *      400:
 *        description: Bad request
 *      500: 
 *        description: Internal server error 
 */

// CREATE POST // CREATE POST // CREATE POST

/**
 * @swagger
 * /post/:
 *  post:
 *    summary: Create a new post
 *    tags: [Posts]
 *    description: Create a new post
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Posts'
 *    responses:
 *      200:
 *        description: The post has been created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Posts'
 *      400:
 *        description: Bad request
 *      500: 
 *        description: Internal server error 
 */

// UPDATE POST // UPDATE POST // UPDATE POST

/**
 * @swagger
 * /post/{id}:
 *  put:
 *    summary: Update a post
 *    tags: [Posts]
 *    description: Update a post
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The post ID
 *        example: 660ee1a0087a16af4c17bf24
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *                userId:
 *                  type: string
 *                  example: 123456
 *    responses:
 *      200:
 *        description: The post has been updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Posts'
 *      400:
 *        description: Bad request
 *      500: 
 *        description: Internal server error 
 */

// DELETE POST // DELETE POST // DELETE POST

/**
 * @swagger
 * /post/{id}:
 *  delete:
 *    summary: Delete a post
 *    tags: [Posts]
 *    description: Delete a post
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The post ID
 *        example: 660ee68ebbeeb21daa053f53
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                userId:
 *                  type: string
 *                  example: 123456
 *    responses:
 *      200:
 *        description: The post has been deleted
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Posts'
 *      400:
 *        description: Bad request
 *      500: 
 *        description: Internal server error 
 */



export default router;


