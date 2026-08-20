const mongoose = require("mongoose");
const { kMaxLength } = require("node:buffer");
const validator = require("validator");



const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minlength:4,
        maxlength:20,
    },
    lastName:{
        type:String, 
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
               throw new Error("invalid email address :" + value);
            }
        }
    },
    password:{
        type:String,
          required:true,
           validate(value){
            if(!validator.isStrongPassword(value)){
               throw new Error("Enter a strong password :" + value);
            }
           },
        },
    age:{
        type:Number,
        min:18,
        max:50
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female", "others"].includes(value)){
                throw new Error("Invalid gender");
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiibOngFYog5Ri5UoFKH3CsHMOvomBLf4JAw&s",
          validate(value){
            if(!validator.isURL(value)){
               throw new Error("invalid photo url :" + value);
            }
        }
    },
    about:{
        type:String,
        default:"This is the default aboout of the user!",
    },
    skills:{
        type:[String],
    },
  
   }, {
        timestamps:true
    },
)

module.exports = mongoose.model("User", userSchema);