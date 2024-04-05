import express from 'express'
import { createChat, findChat, userChats, deleteChat, findChatById} from '../Controllers/chatController.js';
const router = express.Router()

router.post('/', createChat);
router.delete('/delete', deleteChat);
router.get('/:userId', userChats);
router.get('/find/:firstId/:secondId', findChat);
router.get('/find/:id', findChatById);

// SWAGGER ANNOTIONS // SWAGGER ANNOTIONS // SWAGGER ANNOTIONS // SWAGGER ANNOTIONS

/// Schema for the chat object
/**
 * @swagger
 * components:
 *  schemas:
 *    Chat:
 *      type: object
 *      required:
 *        - members
 *      properties:
 *        members:
 *          type: array
 *          description: The members of the chat
 *      example:
 *        members: [123456, 123456]
 */

/// Tags for the chat object
/**
 * @swagger
 * tags:
 *  name: Chats
 *  description: The chat managing API
 */

// CREATE CHAT // CREATE CHAT // CREATE CHAT

/**
 * @swagger
 * /chat/:
 *  post:
 *    summary: Creates a chat
 *    tags: [Chats]
 *    requestBody:
 *        required: true
 *        content:
 *             application/json:
 *                  schema:
 *                       type: object
 *                       required:
 *                            - members
 *                       properties:    
 *                            members:
 *                                 type: array
 *                                 example: [123456, 123456]
 *    responses:
 *      200:
 *        description: The chat has been created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Chat'
 *      400:
 *        description: Bad request
 *      500: 
 *        description: Internal server error 
 */

// FIND CHAT PER USER // FIND CHAT PER USER // FIND CHAT PER USER

/**
 * @swagger
 * /chat/{userId}:
 *  get:
 *    summary: Get all chats for a user
 *    tags: [Chats]
 *    description: Get all chats for a user
 *    parameters:
 *      - in: path
 *        name: userId
 *        schema:
 *          type: string
 *        required: true
 *        description: The user ID
 *        example: 123456
 *    responses:
 *      200:
 *        description: The chats for the user
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Chat'
 *      400:
 *        description: Bad request
 *      500: 
 *        description: Internal server error 
 */

//  FIND CHAT BY ID //  FIND CHAT BY ID //  FIND CHAT BY ID

/**
 * @swagger
 * /chat/find/{id}:
 *  get:
 *    summary: Get a chat by ID
 *    tags: [Chats]
 *    description: Get a chat by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The chat ID
 *        example: 660fe97c401712c015b639c7
 *    responses:
 *      200:
 *        description: The chat description by ID
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Chat'
 *      400:
 *        description: Bad request
 *      500: 
 *        description: Internal server error 
 */

// DELETE CHAT // DELETE CHAT // DELETE CHATq

/**
 * @swagger
 * /chat/delete:
 *  delete:
 *    summary: Delete a chat
 *    tags: [Chats]
 *    description: Delete a chat
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - chatId
 *            properties:
 *              id:
 *                type: string
 *                description: The chat ID
 *                example: 660fe97c401712c015b639c7
 *    responses:
 *      200:
 *        description: The chat has been deleted
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Chat'
 *      400:
 *        description: Bad request
 *      500: 
 *        description: Internal server error 
 */




export default router