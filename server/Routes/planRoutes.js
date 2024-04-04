import express from "express";
import { createPlan, getPlanById, getPlans, interestedIn, uninterestedIn, deletePlan, updatePlan, getPlanByTitle , getLimitedPlans, getPlansByUser} from "../Controllers/planController.js";

const router = express.Router()

router.post('/', createPlan)
router.get('/limited', getLimitedPlans)
router.get('/', getPlans)
router.get('/:id', getPlanById)
router.get('/user/:id', getPlansByUser)
router.put('/interested/:id', interestedIn)
router.put('/uninterested/:id', uninterestedIn)
router.delete('/:id', deletePlan)
router.put('/:id', updatePlan)
router.get('/title/:title', getPlanByTitle)


/// Swagger Annotiations   /// Swagger Annotiations   /// Swagger Annotiations   /// Swagger Annotiations   
///// Schema for the plan object
/**
 * @swagger
 * components:
 *  schemas:
 *    Plan:
 *      type: object
 *      required:
 *        - title
 *        - desc
 *        - from
 *        - to
 *        - city
 *        - lat
 *        - lng
 *        - userId
 *        - peopleinterested
 *      properties:
 *        title:
 *          type: string
 *          description: The title of the plan
 *        desc:
 *          type: string
 *          description: The description of the plan
 *        from:
 *          type: string
 *          description: When the plan starts if it specified
 *        to:
 *          type: string
 *          description: When the plan ends if it specified
 *        city:
 *          type: string
 *          description: The location of the plan
 *        lat:
 *          type: number
 *          description: The latitude of the location
 *        lng:
 *          type: number
 *          description: The longitude of the location
 *        userId:
 *          type: string
 *          description: The user who created the plan
 *        peopleinterested:
 *          type: array
 *          description: The users interested in the plan
 *        user:
 *          type: string
 *          description: The user who created the plan
 *      example:
 *        title: Plan 1
 *        desc: This is plan 1
 *        from: 2022-01-01
 *        to: 2022-01-02
 *        city: Berlin
 *        lat: 52.520008
 *        lng: 13.404954
 *        userId: 123456
 *        peopleinterested: []
 */

//// TAG  //// TAG  //// TAG  //// TAG  //// TAG  //// TAG  
/**
 * @swagger
 * tags:
 *  name: Plan
 *  description: The plan managing API
 */

//// GET  //// GET  //// GET  //// GET  //// GET  //// GET
/**
 * @swagger
 * /plan/:
 *  get:
 *    summary: Returns the list of all the plans
 *    tags: [Plan]
 *    description: Retrieve all plans.
 *    responses:
 *      200:
 *        description: The list of the plans
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Plan'
 *      400:
 *        description: Bad request
 *      404:
 *        description: No plans found
 *      500: 
 *        description: Internal server error 
 */
//// GET ONE PLAN  //// GET ONE PLAN  //// GET ONE PLAN  //// GET ONE PLAN  //// GET ONE PLAN  //// GET ONE PLAN
/**
 * @swagger
 * /plan/{id}:
 *  get:
 *    summary: Get the plan by id
 *    tags: [Plan]
 *    description: Get the plan by id
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The plan id
 *        example: 65eb0cecaa780cb55fca31d0
 *    responses:
 *      200:
 *        description: The plan
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Plan'
 *      400:
 *        description: Bad request
 *      404:
 *        description: The plan was not found
 *      500: 
 *        description: Internal server error 
 */

// CREATE A PLAN // CREATE A PLAN  // CREATE A PLAN  // CREATE A PLAN  // CREATE A PLAN  // CREATE A PLAN

/**
 * @swagger
 * /plan/:
 *  post:
 *    summary: Create a new plan
 *    tags: [Plan]
 *    description: Create a new plan
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Plan'
 *    responses:
 *      201:
 *        description: The plan was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Plan'
 *      400:
 *        description: Bad request
 *      500: 
 *        description: Internal server error 
 */

// UPDATE A PLAN // UPDATE A PLAN  // UPDATE A PLAN  // UPDATE A PLAN  // UPDATE A PLAN  // UPDATE A PLAN

/**
 * @swagger
 * /plan/{id}:
 *  put:
 *    summary: Update a plan
 *    tags: [Plan]
 *    description: Update a plan
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The plan id
 *        example: 660ed29a3c743cd06804c28d
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Plan'
 *    responses:
 *      200:
 *        description: The plan was successfully updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Plan'
 *      400:
 *        description: Bad request
 *      404:
 *        description: The plan was not found
 *      500: 
 *        description: Internal server error 
 */

// DELETE A PLAN // DELETE A PLAN  // DELETE A PLAN  // DELETE A PLAN  // DELETE A PLAN  // DELETE A PLAN

/**
 * @swagger
 * /plan/{id}:
 *  delete:
 *    summary: Delete a plan
 *    tags: [Plan]
 *    description: Delete a plan
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The plan id
 *        example: 660edc0c51d65cf73a862b7a
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
 * 
 *    responses:
 *      200:
 *        description: The plan was successfully deleted
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Plan'
 *      400:
 *        description: Bad request
 *      404:
 *        description: The plan was not found
 *      500: 
 *        description: Internal server error 
 */


export default router;





