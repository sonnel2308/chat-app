import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userController from './controllers/userController.js';
import streamController from './controllers/streamController.js';

const app = express();

dotenv.config();
const PORT = 8000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());

app.use('/user', userController);
app.use('/stream', streamController);

mongoose.connect(MONGO_URI).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
})
.catch(() => console.log('Failed to connect to MongoDB'));