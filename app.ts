import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { config } from './config/environment';
import authRoutes from './routes/user.routes';
import noteRoutes from './routes/note.routes';

import categoryRoutes from './routes/category.routes';
const app = express();


app.use(cors());
app.use(express.json());


mongoose.connect(config.mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));


app.use('/auth', authRoutes);
app.use('/api', noteRoutes);
app.use('/api/category', categoryRoutes);

export default app;