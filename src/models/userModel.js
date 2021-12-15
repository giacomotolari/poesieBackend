import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true, unique: true },
    accessGroups: { type: String, required: true },
    hash: { type: String, required: true, select: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModel = mongoose.model('UserModel', userSchema, 'users');

export default UserModel;

