import express from "express";
import {createLike, getLikes, getMatches} from "../Controllers/matchesController.js";

const router = express.Router();




router.post('/', createLike);
router.post('/getlikes', getLikes);
router.post('/getmatches', getMatches);




export default router












