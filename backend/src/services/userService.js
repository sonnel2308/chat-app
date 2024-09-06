import User from '../models/User.js';

export const createUser = async (username, email, password, biography) => {
  const user = await User.create({username, email, password, biography});
  return user;
}

export const getUser = async (userId) => {
  const user = await User.findOne({_id: userId}).catch(err => {return null});
  return user;
}

export const updateUserInfo = async (userId, userField, newValue) => {
  const validFields = [
    'username', 'email', 'password', 'profilePicture', 'biography', 'visibility', 'friendIDs',
    'blockedUserIDs', 'streamIDs', 'mutedStreams', 'securityQuestion', 'securityQuestionAnswer', 'backgroundPicture'
  ];

  if (!validFields.includes(userField)) {
    return null;
  }

  const query = { _id: userId };
  const update = {};
  update[userField] = newValue;
  const res = await User.findOneAndUpdate(query, update).catch(err => {return null});
  console.log(`RESULT: ${res}`);
  return res;
}

export const blockUser = async (userId, blockedUserId) => {
  const query = { _id: userId };
  const res = await User.findOneAndUpdate(query, { $push: { blockedUserIDs: blockedUserId }}).catch(err => {return null});

  console.log(`RESULT: ${res}`);
  return res;
}

export const unblockUser = async (userId, blockedUserId) => {
  const query = { _id: userId };
  const res = await User.findOneAndUpdate(query, { $pull: { blockedUserIDs: blockedUserId } }).catch(err => {return null});

  return res;
}