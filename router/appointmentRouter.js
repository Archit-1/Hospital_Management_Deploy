import express from "express";
import { deleteAppointment, getAllApointments, postAppointment, updateAppointmentStatus } from "../controller/appointmentController.js";
import {isAdminAuthenticated,isPatientAuthenticated} from "../middlewares/auth.js"


const router = express.Router();


router.post("/take",isPatientAuthenticated,postAppointment);
router.get("/getall",isAdminAuthenticated,getAllApointments);
router.put("/update/:id",isAdminAuthenticated,updateAppointmentStatus);
router.delete("/delete/:id",isAdminAuthenticated,deleteAppointment);


export default router;


