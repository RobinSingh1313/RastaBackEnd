const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: { type: String,  required: true },

    password: { type: String, required: false },
  
  },
  {
collection:'user-data'
  }
);
const User = mongoose.model('user-data', userSchema); 

module.exports = User;
