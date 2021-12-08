import mongoose from 'mongoose';

const indiceSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const IndiceModel = mongoose.model('IndiceModel', indiceSchema, 'indice');

export default IndiceModel;
