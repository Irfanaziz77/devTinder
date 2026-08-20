const express = require("express");
const connectDB = require("../config/database.js");
const User = require("./models/user.js");
const { validateSignUpData } = require("./utils/validation.js");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("../src/Middleware/auth");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
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

   app.post("/login", async(req,res)=>{
       try{
        const {emailId, password} = req.body;
        const user=  await User.findOne({emailId: emailId});
        if(!user){
          throw new Error("Invalid email");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

      if(isPasswordValid){
    //create a JWT token 
    const token = await jwt.sign({_id: user._id}, "Dev@Tinder$790", {expiresIn: "7d"});
    console.log(token)
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
   })


    app.get("/profiles", userAuth, async (req,res)=>{
    
   try{
    const user = req.user;
     res.send(user);
   }catch(err){
        res.status(400).send('ERROR'+ err.messsage)
    }
     });
   

     app.post("/sendConnectionRequest", userAuth, async (req, res)=>{
      const user = req.user
           //sending connection request
           console.log("send connection request");
           res.send(user.firstName + " connection Resquest send!");
     })



connectDB()
  .then(() => {
    console.log("Database connection is estabilised...");
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777....");
    });
  })

  .catch((err) => {
    console.error("Database connection Failed....");
  });
