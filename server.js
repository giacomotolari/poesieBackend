import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
const app = express();
const port = 9000;
const mongoConnectString = 'mongodb://localhost:27017';
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
    const users = await db
      .collection('di_acque')
      .find()
    //   .project({
    //     title: 1,
    //     text: 1,
    //   })
      .toArray();
    res.json(users);
  });
});

app.listen(port, () =>
  console.log(`listening on port http://localhost:${port}`)
);
