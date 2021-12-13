import mongoose from 'mongoose';

const terreSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    text: { type: String },
    description: { type: String },
    likes: { type: Number },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const TerreModel = mongoose.model('TerreModel', terreSchema, 'di_terre');

export default TerreModel;
