// import mongoose, { Schema, Document } from 'mongoose';

// export interface ICategory extends Document {
//   name: string;
// }

// const CategorySchema: Schema = new Schema({
//   name: { type: String, required: true }
// });

// export default mongoose.model<ICategory>('Category', CategorySchema);
import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  user_id: mongoose.Schema.Types.ObjectId;
  created_at: Date;
  updated_at: Date;
}

const CategorySchema: Schema = new Schema({
  name: { type: String, required: true, unique: true, index: true },  
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

export default mongoose.model<ICategory>('Category', CategorySchema);
