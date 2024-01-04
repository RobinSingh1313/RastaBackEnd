// Assuming you're using Mongoose for MongoDB
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the DateFolders schema
const dateFolderSchema = new Schema({
  date: {
    type: String,
    required: true,
    unique: true,
  },
});

// Create the DateFolders model
const DateFolders = mongoose.model('DateFolders', dateFolderSchema);

module.exports = DateFolders;
