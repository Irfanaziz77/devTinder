const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require("../Middleware/auth");

module.exports = requestRouter;

 requestRouter.post("/sendConnectionRequest", userAuth, async (req, res)=>{
      const user = req.user
           //sending connection request
           console.log("send connection request");
           res.send(user.firstName + " connection Resquest send!");
     });