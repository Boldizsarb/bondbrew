import express from "express";
import {createNotification, getNotifications, createMessageNotification, deleteNotification, getMessageNotifications} from "../Controllers/notificationController.js";
const router = express.Router()

router.post("/", createNotification);
router.post("/get", getNotifications);
router.post("/message", createMessageNotification);
router.delete("/delete", deleteNotification);
router.post("/getmessage", getMessageNotifications);



// SWAGGER ANNOTATIONS  // SWAGGER ANNOTATIONS  // SWAGGER ANNOTATIONS  // SWAGGER ANNOTATIONS

// Schema for the notification object

/**
 * @swagger
 * components:
 *  schemas:
 *    Notification:
 *      type: object
 *      required:
 *        - userfrom
 *        - userto
 *        - type
 *      properties:
 *        userfrom:
 *          type: string
 *          description: The user who sent the notification
 *        userto:
 *          type: string
 *          description: The user who received the notification
 *        type:
 *          type: string
 *          description: The type of notification
 *      example:
 *        userfrom: 123456
 *        userto: 123456
 *        type: message
 */

/// Tags for the notification object


/**
 * @swagger
 * tags:
 *  name: Notifications
 *  description: The notifications managing API
 */

// CREATE NOTIFICATION // CREATE NOTIFICATION // CREATE NOTIFICATION

/**
 * @swagger
 * /notification:
 *  post:
 *    summary: Create a notification
 *    tags: [Notifications]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Notification'
 *    responses:
 *      200:
 *        description: A notification schema
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Notification'
 *      400:
 *        description: Bad request
 *      500: 
 *        description: Internal server error 
 */

// GET NOTIFICATIONS // GET NOTIFICATIONS // GET NOTIFICATIONS

/**
 * @swagger
 * /notification/get:
 *  post:
 *    summary: Get notifications of a user
 *    tags: [Notifications]
 *    description: Get notifications
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                   userto:
 *                    type: string
 *                    example: 123456
 *    responses:
 *      200:
 *        description: The notifications
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Notification'
 *      400:
 *        description: Bad request
 *      500: 
 *        description: Internal server error 
 */

// DELETE NOTIFICATION // DELETE NOTIFICATION // DELETE NOTIFICATION

/**
 * @swagger
 * /notification/delete:
 *  delete:
 *    summary: Delete a notification
 *    tags: [Notifications]
 *    description: Delete a notification
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                   userto:
 *                      type: string
 *                      example: 123456
 *                   userfrom:
 *                      type: string
 *                      example: 123456
 *    responses:
 *      200:
 *        description: The notification has been deleted
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Notification'
 *      400:
 *        description: Bad request
 *      500: 
 *        description: Internal server error 
 */




export default router;


// 660ff63d20abbc085b0fbd8d