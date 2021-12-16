import mongoose from 'mongoose';

const amoriSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    text: { type: String },
    description: { type: String },
    likes: { type: Array},
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const AmoriModel = mongoose.model('AmoriModel', amoriSchema, 'di_amori');

export default AmoriModel;
