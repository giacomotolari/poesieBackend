import mongoose from 'mongoose';

const prefazioneSchema = new mongoose.Schema(
  {
    // description: { type: String, required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const PrefazioneModel = mongoose.model('PrefazioneModel', prefazioneSchema, 'prefazione');

export default PrefazioneModel;
