const ErrorHandler = require("../utils/errorhandle");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require('../models/userSchoolModel');
const sendToken = require("../utils/jwtToken");



// Register a user
exports.userRegister =catchAsyncErrors( async(req,res,next)=>{
    const {name, schoolname,email, password} = req.body;

    const user = await User.create({
        name,
        schoolname,
        email,
        password,
        avatar:{
            public_id:"this is sample id",
            url:"profilePicUrl",

        }
    });

    sendToken(user,201,res);

});




// login user

exports.userLogin = catchAsyncErrors(async (req,res,next)=>{
    const {email, password} = req.body;

    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email and Password"),400)
    }

    const user = await User.findOne({email}).select("+password")

    if(!user){
        return next(new ErrorHandler("Invalid Email or password",401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or password",401));
    }

    sendToken(user,200,res);

});



// logOut user


exports.logout = catchAsyncErrors(async (req,res,next)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true,

    });
    res.status(200).json({
        success:true,
        message:"logged Out"
    })


})

