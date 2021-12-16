import './config.js';
import './db-connect.js';
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { poemRouter } from './routers/poemRouter.js';
import { signupRouter } from './routers/signupRouter.js';
import { loginRouter } from './routers/loginRouter.js';

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.set('trust proxy', 1);
app.use(
  cors({
    // origin: process.env.NODE_ENV !== "production" ? process.env.FRONTEND_ORIGIN : [process.env.FRONTEND_ORIGIN_HTTP, process.env.FRONTEND_ORIGIN_HTTPS],
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production',
    },
  })
);

// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     credentials: true,
//   })
// );

// app.use(cookieParser());
// app.use(
//   session({
//     resave: true,
//     saveUninitialized: true,
//     secret: process.env.SECRET,
//   })
// );

app.use('/signup', signupRouter, (req, res) => {
  res.status(404).send({
    message: '404 page not found',
    url: req.originalUrl,
  });
});

app.use('/login', loginRouter, (req, res) => {
  res.status(404).send({
    message: '404 page not found',
    url: req.originalUrl,
  });
});

app.use('/', poemRouter, (req, res) => {
  res.status(404).send({
    message: '404 page not found',
    url: req.originalUrl,
  });
});

app.listen(port, () =>
  console.log(`listening on port http://localhost:${port}`)
);
