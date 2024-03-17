import express from "express";
import {createLike, getLikes, getMatches, createDislike, extractMatches} from "../Controllers/matchesController.js";

const router = express.Router();




router.post('/', createLike);
router.post('/getlikes', getLikes);
router.post('/getmatches', getMatches);
router.post('/dislike', createDislike);
router.post('/extractmatches', extractMatches);




export default router












