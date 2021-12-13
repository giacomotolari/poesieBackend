import '../config.js';
import express from 'express';
import IndiceModel from '../models/indiceModel.js';
import PrefazioneModel from '../models/prefazioneModel.js';
import AcqueModel from '../models/acqueModel.js';
import TerreModel from '../models/terreModel.js';
import AmoriModel from '../models/amoriModel.js';
import PostfazioneModel from '../models/postfazioneModel.js';
import mongoose from 'mongoose';

const poemRouter = express.Router();

poemRouter.get('/', async (req, res) => {
  const response = [
    ...(await IndiceModel.find({})),
    ...(await PrefazioneModel.find({})),
    ...(await AcqueModel.find({})),
    ...(await TerreModel.find({})),
    ...(await AmoriModel.find({})),
    ...(await PostfazioneModel.find({})),
  ];
  res.json(response);
});

poemRouter.patch('/addLike/acque/:id', async (req, res) => {
  const id = req.params.id;
  const poem = await AcqueModel.findById(id);
  const likes = poem.likes + 1;
  await AcqueModel.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(id) },
    { $set: { likes } },
    { new: true }
  );
  res.status(200).json({ likes: likes });
});
poemRouter.patch('/addLike/terre/:id', async (req, res) => {
  const id = req.params.id;
  const poem = await TerreModel.findById(id);
  const likes = poem.likes + 1;
  await TerreModel.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(id) },
    { $set: { likes } },
    { new: true }
  );
  res.status(200).json({ likes: likes });
});
poemRouter.patch('/addLike/amori/:id', async (req, res) => {
  const id = req.params.id;
  const poem = await AmoriModel.findById(id);
  const likes = poem.likes + 1;
  await AmoriModel.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(id) },
    { $set: { likes } },
    { new: true }
  );
  res.status(200).json({ likes: likes });
});

export { poemRouter };
