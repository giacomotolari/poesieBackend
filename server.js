import './config.js'
import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';


const app = express();
const port = 9000;
const mongoConnectString = process.env.MONGODB_URI;
const client = new MongoClient(mongoConnectString);

app.use(express.json());
app.use(cors());

const execMongo = async (done) => {
  await client.connect();
  const db = client.db('poems');
  done(db);
};

app.get('/', (req, res) => {
  execMongo(async (db) => {
    const response = [
      ...(await db.collection('indice').find().toArray()),
      ...(await db.collection('prefazione').find().toArray()),
      ...(await db.collection('di_acque').find().toArray()),
      ...(await db.collection('di_Terre').find().toArray()),
      ...(await db.collection('di_amori').find().toArray()),
      ...(await db.collection('postfazione').find().toArray()),
    ];
    res.json(response);
  });
});

app.get('/prefazione', (req, res) => {
  execMongo(async (db) => {
    const response = await db.collection('prefazione').find().toArray();
    res.json(response);
  });
});

app.get('/indice', (req, res) => {
  execMongo(async (db) => {
    const response = await db.collection('indice').find().toArray();
    res.json(response);
  });
});

app.get('/acque', (req, res) => {
  execMongo(async (db) => {
    const response = await db.collection('di_acque').find().toArray();
    res.json(response);
  });
});

app.get('/terre', (req, res) => {
  execMongo(async (db) => {
    const response = await db.collection('di_Terre').find().toArray();
    res.json(response);
  });
});

app.get('/amori', (req, res) => {
  execMongo(async (db) => {
    const response = await db.collection('di_amori').find().toArray();
    res.json(response);
  });
});

app.get('/postfazione', (req, res) => {
  execMongo(async (db) => {
    const response = await db.collection('postfazione').find().toArray();
    res.json(response);
  });
});

app.listen(port, () =>
  console.log(`listening on port http://localhost:${port}`)
);
