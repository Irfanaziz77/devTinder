const express =require('express');
const authRouter = express.Router();

const { validateSignUpData } = require("../utils/validation.js");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");


authRouter.post("/signup", async (req, res) => {
  try {
    //validation of data
    validateSignUpData(req);

    //Encrypt the password
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    //creating a new user instance of the user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("user added successfully..");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

   authRouter.post("/login", async(req,res)=>{
       try{
        const {emailId, password} = req.body;
        const user=  await User.findOne({emailId: emailId});
        if(!user){
          throw new Error("Invalid credentials");
        }

        const isPasswordValid = await user.validatePassword(password);

      if(isPasswordValid){
    //create a JWT token 
       const token = await user.getJWT()
    //add the token t cookie and send the responce back to the user
     res.cookie("token", token, {
       expires: new Date(Date.now() +8 * 3600000),
     });


        res.send("Login Successfully");
      }else{
        throw new Error("Invalid Password");
      }


       }catch(err){
           res.status(400).send("ERROR : " + err.message);
       }
   });

// authRouter.get('./');

module.exports = authRouter;