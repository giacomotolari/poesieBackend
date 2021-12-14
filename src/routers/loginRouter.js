import '../config.js';
import express from 'express';
// import * as userController from '../controllers/userController.js';
import UserModel from '../models/userModel.js';
// import mongoose from 'mongoose';

const loginRouter = express.Router();

// const userIsInGroup = (user, accessGroup) => {
//   const accessGroupArray = user.accessGroups.split(',').map((m) => m.trim());
//   return accessGroupArray.includes(accessGroup);
// };

loginRouter.post('/', async (req, res) => {
  const userName = req.body.userName;
  let user = await UserModel.findOne({ userName: userName });
  if (!user) {
    user = await UserModel.findOne({ userName: 'anonymousUser' });
  }

  req.session.user = user;
  req.session.save();
  res.json(user);
});

loginRouter.get('/currentuser', async (req, res) => {
  let user = req.session.user;
  if (!user) {
    user = await UserModel.findOne({ userName: 'anonymousUser' });
  }
  res.json({ user });
});

loginRouter.get('/logout', async (req, res) => {
  req.session.destroy();
  const user = await UserModel.findOne({ userName: 'anonymousUser' });
  res.json(user);
});

export { loginRouter };
