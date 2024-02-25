import express from "express";
import { createPlan, getPlanById, getPlans, interestedIn, uninterestedIn, deletePlan} from "../Controllers/planController.js";

const router = express.Router()

router.post('/', createPlan)
router.get('/', getPlans)
router.get('/:id', getPlanById)
router.put('/interested/:id', interestedIn)
router.put('/uninterested/:id', uninterestedIn)
router.delete('/:id', deletePlan)


export default router;