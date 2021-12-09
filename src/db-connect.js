import './config.js';
import mongoose from 'mongoose';

// URINNEN
// SENSITIVE DATA => never store stuff like this in code
// connection strings, passwords, secrets

// we need dotenv.config() to be executred BEFOE!
// const mongoConnectionString = 'mongodb://localhost:27017';
const MONGO_URI = process.env.MONGO_URI;
// const mongoConnectionString = 'mongodb+srv://giacomotolariAdmin:123qwe12@cluster0.jr2xw.mongodb.net/al_porto';
// MONGODB_URI = 'mongodb://localhost:27017';
console.log({ MONGO_URI });

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB Connection estabished!'))
  .catch((err) => console.log('[ERROR] Connection failed', err));
