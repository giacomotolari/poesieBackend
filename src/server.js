import './config.js'
import './db-connect.js';
import express from 'express';
import cors from 'cors';
import {poemRouter} from './routers/poemRouter.js'


const app = express();
const port = process.env.PORT || 7777;

app.use(express.json());
app.use(cors());

app.use('/', poemRouter, (req, res) => {
  res.status(404).send({
    message: '404 page not found',
    url: req.originalUrl,
  });
});


app.listen(port, () =>
  console.log(`listening on port http://localhost:${port}`)
);
