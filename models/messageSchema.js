import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
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
    message:{
        type:String,
        required:true,
        minLength:[1,"Character must contain 10 words"],
    }
       

})

// export const Message = mongoose.model("Message",messageSchema);

// module.exports = mongoose.model("Message",messageSchema);
// export const Message = mongoose.model('Message', messageSchema);

const Message = mongoose.model('Message', messageSchema);
export default Message;