const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter your email"],
        maxLength:[50,"Name cannot exceeds 50 character"],
        minLength:[4, "Name should have more than characters"]
    },
    schoolname:{
        type:String,
        required:[true,"Please Enter your School name"],
        maxLength:[200,"Name cannot exceeds 50 character"],
        minLength:[4, "Name should have more than characters"]
    },
    email:{
        type:String,
        required:[true,"Please Enter your name"],
        unique:[true],
        validate:[validator.isEmail, "Please Enter a Valid Email"]

    },
    password:{
        type:String,
        required:[true,"Please Enter your password"],
        maxLength:[50,"Name cannot exceeds 50 character"],
        minLength:[8, "Password should be more  than 8 characters"]
        

    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"schoolAdmin"
    },
    resetPasswordToken:String,
    esetPasswordExpired:Date,
});

userSchema.pre("save", async function(next){

    if(!this.isModified("password")){
        next();
    }
    this.password =await  bcrypt.hash(this.password,10)
});

// JWT Token

userSchema.methods.getJWTToken= function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    });
}



//compare Password

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

module.exports = mongoose.model("UserSchool",userSchema);