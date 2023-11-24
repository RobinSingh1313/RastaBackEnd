const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    designation: { type: String, required: true },
    password: { type: String, required: true },
    idCardImagePath: { type: String }, // Field for ID card image path
    profileImagePath: { type: String }, // Field for profile picture path
  },
  {
collection:'MetaData'
  }
);
const User = mongoose.model('MetaData', userSchema); 

module.exports = User;
