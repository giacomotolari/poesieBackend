import "../config.js";
import express from "express";
// import * as userController from '../controllers/userController.js';
import UserModel from "../models/userModel.js";
// import mongoose from 'mongoose';

const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
  const userName = req.body.userName;
  // console.log(userName,"req.body.userName");
  let user = await UserModel.findOne({ userName: userName });
  // console.log(user);
  if (!user) {
    user = await UserModel.findOne({ userName: "anonymousUser" });
  }
  req.session.user = user;
  // console.log(user);
  req.session.save();
  res.json(user);
});

loginRouter.get("/currentuser", async (req, res) => {
  let user = req.session.user;
  // console.log(user);
  if (!user) {
    user = await UserModel.findOne({ userName: "anonymousUser" });
  }
  res.json({ user });
});

loginRouter.get("/users", async (req, res) => {
  // console.log(user);

  const users = await UserModel.find({});

  res.json(users);
});

loginRouter.get("/logout", async (req, res) => {
  req.session.destroy();
  const user = await UserModel.findOne({ userName: "anonymousUser" });
  res.json(user);
});

export { loginRouter };

