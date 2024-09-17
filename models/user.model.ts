import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  phone: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  phone: { type: String },
  resetPasswordToken: { type: String },  // Token for password reset
  resetPasswordExpires: { type: Date },  // Expiry for the token
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  
});

export default mongoose.model<IUser>('User', UserSchema);




// import mongoose, { Schema, Document } from 'mongoose';

// export interface IUser extends Document {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;  
//   role: 'user' | 'admin';
//   phone: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// const UserSchema: Schema = new Schema({
//    firstName: { type: String },
//   lastName: { type: String },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ['user', 'admin'], default: 'user' },
//   phone: { type: String },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
// });


// export default mongoose.model<IUser>('User', UserSchema);