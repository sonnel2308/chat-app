import express from 'express';
import { createUser, getUser, updateUserInfo, blockUser, unblockUser } from '../services/userService.js';

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

const handleFieldUpdate = (field) => async (req, res) => {
  const {userId, newValue} = req.body;
  const updatedUser = await updateUserInfo(userId, field, newValue);
  
  return updatedUser ? res.status(200).send("OK") : res.status(500).json({"error": "could not update user info"});
}

controller.put('/update/username', handleFieldUpdate('username'));
controller.put('/update/password', handleFieldUpdate('password'));
controller.put('/update/email', handleFieldUpdate('email'));
controller.put('/update/biography', handleFieldUpdate('biography'));
controller.put('/update/profilePicture', handleFieldUpdate('profilePicture'));
controller.put('/update/visibility', handleFieldUpdate('visibility'));

controller.put('/block', async (req, res) => {
  const { userId, blockedUserId } = req.body;
  const block = await blockUser(userId, blockedUserId);
  
  return block ? res.status(200).send("OK") : res.status(500).json({"error": "could not block user"});
});

controller.put('/unblock', async (req, res) => {
  const { userId, blockedUserId } = req.body;
  const block = await unblockUser(userId, blockedUserId);
  
  return block ? res.status(200).send("OK") : res.status(500).json({"error": "could not unblock user"});
});

export default controller;