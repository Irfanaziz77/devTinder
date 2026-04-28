const express = require("express");
const connectDB =require("../config/database.js");
const User = require("../models/user.js");
const app = express();

  app.use(express.json());

app.post("/signup", async(req, res)=>{
    const user = new User(req.body);

try{
      await user.save();
    res.send("user added successfully..");
}catch(err){
       res.status(400).send("Error saving the user :" + err.message);
}
});


//get users by email
app.get("/user", async (req,res)=>{
  const userEmail = req.body.emailId;

  try{
   const users =  await User.find({emailId: userEmail});
   if(users.length === 0){
    res.status(404).send("user not found")
   }else{
    res.send(users);
   }
  }
  catch(err){
      res.status(400).send("Something Went Wrong");
  }
});


//Feed Api get-/feed -get all the users from the database

app.get("/feed",async (req,res)=>{
   try{
        const users = await User.find({});
        res.send(users);
   }catch(err){
        res.status(400).send("Something Went Wrong");
   }
})


connectDB()
.then(()=>{
  console.log("Database connection is estabilised...");
app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777....");
});
})

.catch((err)=>{
     console.error("Database connection Failed....")
     
})
