import express from 'express';
import { addMessage, getMessages } from '../Controllers/messageController.js';

const router = express.Router();

router.post('/', addMessage);

router.get('/:chatId', getMessages);

// SWAGGER ANNOTATIONS  // SWAGGER ANNOTATIONS  // SWAGGER ANNOTATIONS  // SWAGGER ANNOTATIONS
// Schema for the message object
/**
 * @swagger
 * components:
 *  schemas:
 *    Message:
 *      type: object
 *      required:
 *        - chatId
 *        - senderId
 *        - text
 *      properties:
 *        chatId:
 *          type: string
 *          description: The chat id
 *        senderId:
 *          type: string
 *          description: The user who sent the message
 *        text:
 *          type: string
 *          description: The message
 *      example:
 *        chatId: 123456
 *        senderId: 123456
 *        text: This is a message
 */

// Tags for the message object
/**
 * @swagger
 * tags:
 *  name: Messages
 *  description: The messages managing API
 */

// ADD MESSAGE // ADD MESSAGE // ADD MESSAGE

/** 
 * @swagger
 * /message:
 *  post:
 *    summary: Add a message
 *    tags: [Messages]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Message'
 *    responses:
 *      200:
 *        description: A message is added
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Message'
 *      400:
 *        description: Bad request
 *      500: 
 *        description: Internal server error 
 */

// GET MESSAGES // GET MESSAGES // GET MESSAGES

/**
 * @swagger
 * /message/{chatId}:
 *  get:
 *    summary: Get messages by chat ID
 *    tags: [Messages]
 *    description: Get messages by chat ID
 *    parameters:
 *      - in: path
 *        name: chatId
 *        schema:
 *          type: string
 *        required: true
 *        description: The chat ID
 *        example: 660ff2affb272795b7828dfa
 *    responses:
 *      200:
 *        description: The messages by chat ID
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Message'
 *      400:
 *        description: Bad request
 *      500: 
 *        description: Internal server error 
 */




export default router