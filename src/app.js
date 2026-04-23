const express = require("express");
const { adminAuth, userAuth } = require("./Middleware/auth");
const app = express();

app.get("/admin", adminAuth);

app.post("/user/login", (req, res)=>{
  res.send("User login successfilly!");
  
},);

app.get("/user/data", userAuth, (req, res)=>{
  res.send("User data");
  
},);


app.get("/admin/getData", (req, res)=>{
  res.send("Get All The Data!");
  
},);

app.get("/admin/Delete", (req, res)=>{
  res.send("Deleted user!");
  
},);

app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777....");
});
