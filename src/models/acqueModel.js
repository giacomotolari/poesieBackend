import mongoose from 'mongoose';

const acqueSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const AcqueModel = mongoose.model('AcqueModel', acqueSchema, 'di_acque');

export default AcqueModel;
