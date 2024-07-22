import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
const appointmentSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[3,"First name contain atleast 3 letter"]
    },
    lastName:{
        type:String,
        required:true,
        minLength:[3,"Last name contain atleast 3 letter"]
        // basically ye jo likha hai 3 ke baad ye tab ayega jab 3 letter nhi hoge
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"Please provide a valid image"]
    },
    phone:{
        type:String,
        required:true,
        // minLength:[11,"Number must contain 10 digit"],
        // maxLength:[11,"Number must contain 10 digit"]
    },
    nic:{
        type:String,
        required:true,
        minLength:[13,"NIC must 13 digits"],
        maxLength:[13,"NIC must 13"],
    },

    dob:{
        type:String,
        required:[true,"DOB is required"],
    },
    gender:{
        type:String,
        required:true,
        enum:["Male","Female"],
    },
    appointment_date:{
        type:String,
        required:true,
    },
    department:{
        type:String,
        required:[true,"Department Name is required"],
    },
    doctor:{
        firstName:{
            type:String,
            required:true,
        },
        lastName:{
            type:String,
            required:true,
        }

    },
    hasVisited:{
        type:Boolean,
        required:true,
    },
    doctorId:{
        type:mongoose.Schema.ObjectId,
        required:true,
    },
    patientId : {
        type:mongoose.Schema.ObjectId,
        required:true,
    },
    address:{
        type:String,
        required:true,

    },
    status:{
        type:String,  
        enum : ["Pending","Accepted","Rejected"],
        default:"Pending",   
    }
  
})

export const Appointment = mongoose.model("Appointment",appointmentSchema);
