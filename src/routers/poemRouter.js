import '../config.js';
import express from 'express';
import IndiceModel from '../models/indiceModel.js';
import PrefazioneModel from '../models/prefazioneModel.js';
import AcqueModel from '../models/acqueModel.js';
import TerreModel from '../models/terreModel.js';
import AmoriModel from '../models/amoriModel.js';
import PostfazioneModel from '../models/postfazioneModel.js';
import UserModel from '../models/userModel.js';
import mongoose from 'mongoose';

const poemRouter = express.Router();

poemRouter.get('/', async (req, res) => {
  let response = [];
  response.push(
    // ...(await IndiceModel.find({}).sort((a, b) => a._id > b._id)),
    ...(await IndiceModel.find({}).sort({_id:1})),
    ...(await PrefazioneModel.find({})),
    ...(await AcqueModel.find({})),
    ...(await TerreModel.find({})),
    ...(await AmoriModel.find({})),
    ...(await PostfazioneModel.find({}))
  );
  res.json(response);
  console.log(response);
});

// poemRouter.get('/', async (req, res) => {
//   const response = [
//     ...(await IndiceModel.find({})),
//     ...(await PrefazioneModel.find({})),
//     ...(await AcqueModel.find({})),
//     ...(await TerreModel.find({})),
//     ...(await AmoriModel.find({})),
//     ...(await PostfazioneModel.find({})),
//   ];
//   res.json(response);
// });

poemRouter.patch('/addLike/acque/:id', async (req, res) => {
  const id = req.params.id;
  const poem = await AcqueModel.findById(id);
  const userName = req.body.userName;
  let user = await UserModel.findOne({ userName: userName });
  if (!user) {
    user = await UserModel.findOne({ userName: 'anonymousUser' });
  }
  poem.likes.find((element) => element === userName) ||
  userName === 'anonymousUser'
    ? poem.likes
    : poem.likes.push(userName);

  await AcqueModel.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(id) },
    { $set: { likes: poem.likes } },
    { new: true }
  );
  req.session.user = user;
  res.status(200).json({ likes: poem.likes });
});

poemRouter.patch('/addLike/terre/:id', async (req, res) => {
  const id = req.params.id;
  const poem = await TerreModel.findById(id);
  const userName = req.body.userName;
  let user = await UserModel.findOne({ userName: userName });
  if (!user) {
    user = await UserModel.findOne({ userName: 'anonymousUser' });
  }
  poem.likes.find((element) => element === userName) ||
  userName === 'anonymousUser'
    ? poem.likes
    : poem.likes.push(userName);

  await TerreModel.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(id) },
    { $set: { likes: poem.likes } },
    { new: true }
  );
  req.session.user = user;
  res.status(200).json({ likes: poem.likes });
});
poemRouter.patch('/addLike/amori/:id', async (req, res) => {
  const id = req.params.id;
  const poem = await AmoriModel.findById(id);
  const userName = req.body.userName;
  let user = await UserModel.findOne({ userName: userName });
  if (!user) {
    user = await UserModel.findOne({ userName: 'anonymousUser' });
  }
  poem.likes.find((element) => element === userName) ||
  userName === 'anonymousUser'
    ? poem.likes
    : poem.likes.push(userName);

  await AmoriModel.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(id) },
    { $set: { likes: poem.likes } },
    { new: true }
  );
  req.session.user = user;
  res.status(200).json({ likes: poem.likes });
});

export { poemRouter };
