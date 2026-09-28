const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../Middleware/auth");
const { validate } = require("../models/user");
const { validateEditProfileData } = require("../utils/validation");

profileRouter.get("/profiles/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR" + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }
    const LoggedInUser = req.user;
    // console.log(LoggedInUser);
    Object.keys(req.body).forEach((key) => {
      LoggedInUser[key] = req.body[key];
    });
    // console.log(LoggedInUser);
    await LoggedInUser.save();

    res.send(`${LoggedInUser.firstName}, your Profile updated successfully`);
  } catch (err) {
    console.log(err);
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = profileRouter;
