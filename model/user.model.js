const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: { type: String,  required: true },

    password: { type: String, required: false },
  
  },
  {
collection:'details'
  }
);
const User = mongoose.model('details', userSchema); 

module.exports = User;
