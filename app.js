import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnect } from "./database/dbConnect.js";
import messageRouter from "./router/messageRouter.js";
const app = express();
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";

config({ path: "./config/config.env" });
// require('dotenv').config({ path: './config/config.env' });
app.use(express.json());

//  Imagine you have a frontend application hosted at https://frontend.example.com
//  and a backend API hosted at https://api.example.com. Without CORS, 
//  your frontend would not be able to make requests to the backend due to the browser's
//   same-origin policy. By configuring CORS, you explicitly allow
//    https://frontend.example.com to interact with https://api.example.com, 
//    enabling a seamless interaction between your frontend and backend.
  //ye frontend aur backend ko connect larne me kaam ata hai

app.use(cors({ 
    // origin:[process.env.FRONTEND_URL,process.env.Backend_URL],
    origin:[process.env.FRONTEND_URL,process.env.FRONTEND_URL_two],
    methods:["GET","POST","DELETE","PUT"] ,
    credentials:true,
}));

// basically ye work karta hai ki koi aur tumhare website ko access na kar sake it provide security

app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// const sending = require("./router/messageRouter");
app.use("/api/v1/message",messageRouter);
app.use("/api/v1/user",userRouter);
app.use("/api/v1/appointment",appointmentRouter);

dbConnect();

app.use(errorMiddleware);

export default app;
