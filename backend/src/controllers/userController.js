import express from 'express';
import { createUser, getUser, updateUsername } from '../services/userService.js';

const controller = express.Router()

controller.post('/createUser', async (req, res) => {
  console.log("Received request on /createUser");
  const { username, email, password, biography } = req.body;
  const user = await createUser(username, email, password, biography);
  console.log(`Created user: ${user}`);
  return user ? res.status(200).json(user) : res.status(404).json({"error": "cannot create user"});
});

controller.get('/getUser', async (req, res) => {
  console.log("Received request on /getUser");
  const userId = req.query.userId;
  console.log(`userId: ${userId}`);
  const user = await getUser(userId);
  return user ? res.status(200).json(user) : res.status(404).json({"error": "cannot get user"});
});

controller.put('/updateUsername', async (req, res) => {
  console.log("Received request on /updateUsername");
  const { userId, username } = req.body;
  const result = await updateUsername(userId, username);
  console.log("Respoding to request on /updateUsername: ", result);
  return result ? res.status(200).send("OK") : res.status(500).json({"error": "cannot update username"});
});

export default controller;