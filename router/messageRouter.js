import express from "express";
const router = express.Router();
import {isAdminAuthenticated} from "../middlewares/auth.js"
// import { sendMessage } from "../controller/messageController";
import { getAllMessages, sendMessage } from '../controller/messageController.js';


router.post("/send",sendMessage);
router.get("/getall",isAdminAuthenticated,getAllMessages);

export default router;