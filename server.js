import { config } from "dotenv";
import app from "./app.js";
// import cloudinary from "cloudinary"
import { v2 as cloudinary } from "cloudinary";


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
// cloudinary.v2.config({
//     cloud_name:process.env.CLOUDINARY_NAME,
//     api_key:process.env.CLOUDINARY_API_KEY,
//     api_secret:process.env.CLOUDINARY_API_SECRET
// })

// const send = require("./router/messageRouter")
// app.use("/api/v1/",send);
app.listen(8000,()=>{
    console.log(`bhaiya tumra server itne port number par duadne laga hai ${process.env.PORT}`);
})