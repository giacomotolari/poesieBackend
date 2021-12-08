import '../config.js';
import express from 'express';
import IndiceModel from '../models/indiceModel.js';
import PrefazioneModel from '../models/prefazioneModel.js';
import AcqueModel from '../models/acqueModel.js';
import TerreModel from '../models/terreModel.js';
import AmoriModel from '../models/amoriModel.js';
import PostfazioneModel from '../models/postfazioneModel.js';

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

// poemRouter.get('/prefazione', (req, res) => {
//   execMongo(async (db) => {
//     const response = await db.collection('prefazione').find().toArray();
//     res.json(response);
//   });
// });

// poemRouter.get('/indice', (req, res) => {
//   execMongo(async (db) => {
//     const response = await db.collection('indice').find().toArray();
//     res.json(response);
//   });
// });

// poemRouter.get('/acque', (req, res) => {
//   execMongo(async (db) => {
//     const response = await db.collection('di_acque').find().toArray();
//     res.json(response);
//   });
// });

// poemRouter.get('/terre', (req, res) => {
//   execMongo(async (db) => {
//     const response = await db.collection('di_Terre').find().toArray();
//     res.json(response);
//   });
// });

// poemRouter.get('/amori', (req, res) => {
//   execMongo(async (db) => {
//     const response = await db.collection('di_amori').find().toArray();
//     res.json(response);
//   });
// });

// poemRouter.get('/postfazione', (req, res) => {
//   execMongo(async (db) => {
//     const response = await db.collection('postfazione').find().toArray();
//     res.json(response);
//   });
// });

export { poemRouter };
