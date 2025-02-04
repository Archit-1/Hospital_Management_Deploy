import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
// import cloudinary from "cloudinary";
import { v2 as cloudinary } from "cloudinary";
import {generateToken} from "../utils/jwtToken.js"

export const patientRegister = catchAsyncErrors(async(req,res,next)=>{
    const {firstName,lastName,email,phone,password,gender,dob,nic,role} = req.body;
    console.log(firstName);
    console.log(req.body);


    if(!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic || !role){
        return next(new ErrorHandler("Please fill the full form",400));
    }

    let user = await User.findOne({email});
    if(user){
        return next(new ErrorHandler("User already register",400));
    }
    user = await User.create({
        firstName,lastName,email,phone,password,gender,dob,nic,role,
    })
    generateToken(user,"User Registered!",200,res);
   //  res.status(200).json({
   //      success:true,
   //      message:"User Registered",
   //  })
})

export const login = catchAsyncErrors(async(req,res,next)=>{
    const {email,password,confirmPassword,role} = req.body;
     if(!email || !password || !confirmPassword || !role){

        return next(new ErrorHandler("Please Provide All details" , 400));

     }

     if(password !== confirmPassword){
        return next(new ErrorHandler("Password and confirm password do not match" , 400));
     }

     const user = await User.findOne({email}).select("+password");

     if(!user){
        return next(new ErrorHandler("Invalid email or password" , 400));
     }

     const isPasswordMatch = await user.comparePassword(password);
     if(!isPasswordMatch){
        return next(new ErrorHandler("Apka password match nhi hua hai" , 400));
     }
     if(role !== user.role){
        return next(new ErrorHandler("User with this role ar not found" , 400));
     }
     generateToken(user,"User login successfully!",200,res);
   //   res.status(200).json({
   //      success:true,
   //      message:"User login succesfully"
   //   })

})

export const addNewAdmin = catchAsyncErrors(async(req,res,next)=>{
   const {firstName,lastName,email,phone,password,gender,dob,nic} = req.body;

   if(!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic){
      return next(new ErrorHandler("Please fill the full form",400));
   }

   const isRegistered = await User.findOne({email});
   if(isRegistered){
      return next(new ErrorHandler("Admin this email is already exist"));
   }

   const admin = await User.create({
      firstName,lastName,email,phone,password,gender,dob,nic,role:"Admin",
   })

   res.status(200).json({
      success:true,
      message:"New Admin Registered",
      admin,
   })
})

export const getAllDoctors = catchAsyncErrors(async(req,res,next)=>{
   const doctors = await User.find({role : "Doctor"});

   res.status(200).json({
      success:true,
      doctors,
   })
})

export const getUserDetails = catchAsyncErrors(
   async(req,res,next)=>{
      const user = req.user;
      res.status(200).json({
         success:true,
         user,
      })
   }
)

export const logoutAdmin = catchAsyncErrors(
   async(req,res,next)=>{
      res.status(200).cookie("adminToken","",{
            httpOnly:true,
            expires:new Date(Date.now()),
            secure:true,
            sameSite:"None"
            
      }).json({
         success:true,
         message:"Admin User logout successfully",
      })
   }
)


export const logoutPatient = catchAsyncErrors(
   async(req,res,next)=>{
      res.status(200).cookie("patientToken","",{
            httpOnly:true,
            expires:new Date(Date.now()),
            sameSite:"None",
            secure:true,

            
      }).json({
         success:true,
         message:"Patient User logout successfully",
      })
   }
)

// export const addNewDoctor = catchAsyncErrors(async(req,res,next)=>{
//    if(!req.files || Object.keys(req.files).length == 0){
//       return next(new ErrorHandler("Doctor Avatar Required",400));
//    }

//    const {docAvatar} = req.files;
//    const allowedFormat = ["image/png","image/jpeg","image/webp"];
//    if(!allowedFormat.includes(docAvatar.mimetype)){
//       return next(new ErrorHandler("File Format Not Supported!",400));
//    }
//    const{firstName,lastName,email,phone,password,gender,dob,nic,doctorDepartment} = req.body;
   

//    if(!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic || !doctorDepartment){
//       return next(new ErrorHandler("Please Provide Full Details!",400));
//    }

//    const isRegistered = await User.findOne({email});
//    if(isRegistered){
//       return next(new ErrorHandler("Already registered with this email",400));

//    }

//    const cloudinaryResponse = await cloudinary.UploadStream.upload(docAvatar.tempFilePath);
//    if(!cloudinaryResponse || cloudinaryResponse.error){
//       console.error(
//          "Cloudinary error",
//          cloudinaryResponse.error || "Unkown Clodinary Error"
//       );
//    }

//    const doctor = await User.create({
//       firstName,lastName,email,phone,password,gender,dob,nic,doctorDepartment,role:"Doctor",
//       docAvtar:{
//          public_id : cloudinaryResponse.public_id,
//          url : cloudinaryResponse.secure_url,
//       }
//    })

//    res.status(200).json({
//       success : true,
//       message : "New Doctor Registered!",
//       doctor
//    })


// })


export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
   if (!req.files || Object.keys(req.files).length == 0) {
       return next(new ErrorHandler("Doctor Avatar Required", 400));
   }

   const { docAvatar } = req.files;
   const allowedFormat = ["image/png", "image/jpeg", "image/webp"];
   if (!allowedFormat.includes(docAvatar.mimetype)) {
       return next(new ErrorHandler("File Format Not Supported!", 400));
   }

   const { firstName, lastName, email, phone, password, gender, dob, nic, doctorDepartment } = req.body;

   if (!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic || !doctorDepartment) {
       return next(new ErrorHandler("Please Provide Full Details!", 400));
   }

   const isRegistered = await User.findOne({ email });
   if (isRegistered) {
       return next(new ErrorHandler("Already registered with this email", 400));
   }

   try {
       const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath);
       const doctor = await User.create({
           firstName,
           lastName,
           email,
           phone,
           password,
           gender,
           dob,
           nic,
           doctorDepartment,
           role: "Doctor",
           docAvtar: {
               public_id: cloudinaryResponse.public_id,
               url: cloudinaryResponse.secure_url,
           }
       });

       res.status(200).json({
           success: true,
           message: "New Doctor Registered!",
           doctor
       });
   } catch (error) {
       console.error("Cloudinary error", error);
       return next(new ErrorHandler("Cloudinary Error", 500));
   }
});

