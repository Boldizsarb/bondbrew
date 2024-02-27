import express from "express";
import { createPlan, getPlanById, getPlans, interestedIn, uninterestedIn, deletePlan, updatePlan, getPlanByTitle} from "../Controllers/planController.js";

const router = express.Router()

router.post('/', createPlan)
router.get('/', getPlans)
router.get('/:id', getPlanById)
router.put('/interested/:id', interestedIn)
router.put('/uninterested/:id', uninterestedIn)
router.delete('/:id', deletePlan)
router.put('/:id', updatePlan)
router.get('/title/:title', getPlanByTitle)


export default router;