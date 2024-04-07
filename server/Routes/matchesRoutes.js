import express from "express";
import {createLike, getLikes, getMatches, createDislike, extractMatches} from "../Controllers/matchesController.js";

const router = express.Router();




router.post('/', createLike);
router.post('/getlikes', getLikes);
router.post('/getmatches', getMatches);
router.post('/dislike', createDislike);
router.post('/extractmatches', extractMatches);

// SWAGGER ANNOTATIONS  // SWAGGER ANNOTATIONS  // SWAGGER ANNOTATIONS  // SWAGGER ANNOTATIONS

// Schema for the match object

/**
 * @swagger
 * components:
 *  schemas:
 *    Matches:
 *      type: object
 *      required:
 *        - userfromid
 *        - usertoid
 *      properties:
 *        userfromid:
 *          type: string
 *          description: The user who liked
 *        usertoid:
 *          type: string
 *          description: The user who was liked
 *        type:
 *          type: string
 *          description: The type can be either a like or match 
 *      example:
 *        userfromid: "123456"
 *        usertoid: "123456"
 */

/// Tags for the match object

/**
 * @swagger
 * tags:
 *  name: Matches
 *  description: The matches managing API
 */

// CREATE LIKE // CREATE LIKE // CREATE LIKE    // CREATE LIKE // CREATE LIKE // CREATE LIKE

/**
 * @swagger
 * /match/:
 *  post:
 *    summary: The API checks for existent likes or matches with the users if there isnt any then it will create a like instance in the database 
 *    tags: [Matches]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Matches'
 *    responses:
 *      200:
 *        description: The like was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Matches'
 *      500:
 *        description: Some server error
 */

// GET LIKES // GET LIKES // GET LIKES    // GET LIKES // GET LIKES // GET LIKES

/**
 * @swagger
 * /match/getlikes:
 *  post:
 *    summary: Get all likes of a user
 *    tags: [Matches]
 *    description: Get likes
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                   usertoid:
 *                    type: string
 *                    example: 123456
 *    responses:
 *      200:
 *        description: A list of likes
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Matches'
 *      500:
 *        description: Some server error
 */

// Dislike // Dislike // Dislike    // Dislike // Dislike // Dislike

/**
 * @swagger
 * /match/dislike:
 *  post:
 *    summary: Create a dislike
 *    tags: [Matches]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Matches'
 *    responses:
 *      200:
 *        description: The dislike was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Matches'
 *      500:
 *        description: Some server error
 */

// GET MATCHES // GET MATCHES // GET MATCHES    // GET MATCHES // GET MATCHES // GET MATCHES

/**
 * @swagger
 * /match/getmatches:
 *  post:
 *    summary: Get all matches of a user
 *    tags: [Matches]
 *    description: Get matches
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                   userid:
 *                    type: string
 *                    example: 123456
 *    responses:
 *      200:
 *        description: A list of matches
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Matches'
 *      500:
 *        description: Some server error
 */





export default router












