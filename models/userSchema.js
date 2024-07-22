import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
const userSchema = new mongoose.Schema({
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
    password:{
        type:String,
        required:true,
        minLength:[11,"Password must contain exact 11 digits"],
        select:false,
    },

    role:{
        type:String,
        required:true,
        enum:["Admin","Patient","Doctor"],
    }
    ,
    doctorDepartment:{
        type:String,
    },
    docAvtar:{
        public_id:String,
        url:String,
    }
})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);

})

userSchema.methods.comparePassword = async function(EnteredPassword){
    return await bcrypt.compare(EnteredPassword,this.password);
};

userSchema.methods.generateJsonWebToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn : process.env.JWT_EXPIRES,
    });
}



// const User = mongoose.model('User', messageSchema);
// export default User;

export const User = mongoose.model("User", userSchema);