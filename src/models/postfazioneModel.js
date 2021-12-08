import mongoose from 'mongoose';

const postfazioneSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const PostfazioneModel = mongoose.model(
  'PostfazioneModel',
  postfazioneSchema,
  'postfazione'
);

export default PostfazioneModel;
