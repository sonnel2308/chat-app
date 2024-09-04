import express from 'express';
import userController from './controllers/userController.js';
import streamController from './controllers/streamController.js';

const connectDB = require('./config/db');
const dotenv = require('dotenv');
dotenv.config();
connectDB();

const PORT = 8000;
const app = express();

app.use(express.json());

app.use('/user', userController);
app.use('/stream', streamController);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});