import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  profilePicture: String,
  biography: String,
  visibility: Boolean,
  friendIDs: [String],
  blockedUserIDs: [String],
  streamIDs: [String],
  mutedStreams: [String],
  securityQuestion: String,
  securityQuestionAnswer: String,
  backgroundPicture: String
});

export default mongoose.model('User', userSchema);