import express from "express";
import {createNotification, getNotifications, createMessageNotification, deleteNotification, getMessageNotifications} from "../Controllers/notificationController.js";
const router = express.Router()

router.post("/", createNotification);
router.post("/get", getNotifications);
router.post("/message", createMessageNotification);
router.delete("/delete", deleteNotification);
router.post("/getmessage", getMessageNotifications);


export default router;


