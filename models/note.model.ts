import mongoose, { Schema, Document } from 'mongoose';

export interface INote extends Document {
  title: string;
  content: string;
  category_id?: mongoose.Schema.Types.ObjectId;
  user_id: mongoose.Schema.Types.ObjectId;
  created_at: Date;
  updated_at: Date;
}

const NoteSchema: Schema = new Schema({
  title: { type: String, required: true, index: true },
  content: { type: String, required: true },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

export default mongoose.model<INote>('Note', NoteSchema);
