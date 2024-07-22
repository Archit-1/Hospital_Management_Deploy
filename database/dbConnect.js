import mongoose from "mongoose";
import { config} from "dotenv";

export const dbConnect = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"MERN_STACK_HOSPITAL_MANAGEMENT_SYSTEM_DEPLOY",
    })
    .then(()=>{
        console.log("your connection is successfully establish");
    })
    .catch((err)=>{
        console.log(err);
        console.log("this is error in connection between database");
    })
}