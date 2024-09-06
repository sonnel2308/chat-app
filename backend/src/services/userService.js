import User from '../models/User.js';

export const createUser = async (username, email, password, biography) => {
  const user = await User.create({username, email, password, biography});
  console.log(user);
  return user ? user : null;
}

export const getUser = async (userId) => {
  const user = await User.findOne({_id: userId}).catch(err => {return null});
  return user ? user : null;
}

export const updateUsername = async (userId, username) => {
  const query = { _id: userId };
  const res = await User.findOneAndUpdate(query, { username }).catch(err => {return null});
  return res ? res : null;
}