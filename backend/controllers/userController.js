import express, { application } from 'express';

const controller = express.Router()

controller.get('/test', async (req, res) => {
  console.log("test success");
  return res.status(200).json({"status": "success"});
});

export default controller;