const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const path = require('path'); // Add this line
const { v4: uuidv4 } = require('uuid');


const User = require('./model/user.model');
const app = express();
const port = 2700;
const fs = require('fs');

const mongoDbUrl = 'mongodb://127.0.0.1:27017/rasta_ai';

app.use(express.json());

mongoose.connect(mongoDbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

// Registration endpoint
// Registration endpoint
app.post('/registration', async (req, res) => {
    const { username, email, designation, password, idCardImagePath, profileImagePath } = req.body;

    try {
        // Validate required fields
        if (!username || !email || !designation || !password) {
            return res.status(400).send('Missing required fields');
        }

        // Create a new user
        const newUser = new User({
            username,
            email,
            designation,
            password,
            idCardImagePath,
            profileImagePath,
        });

        await newUser.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Error registering user');
    }
});
// Get uploaded data endpoint
app.get('/getUploadedData/', async (req, res) => {

  try {
    // Find uploaded data based on userEmail
    const uploadedData = await Timestamp.find( );

    if (!uploadedData || uploadedData.length === 0) {
      return res.status(404).json({ message: 'No data found for the user' });
    }
    // Send the complete uploaded data (including images) in the response'
    console.log('yy',uploadedData[0]._id)
    res.status(200).send({data:uploadedData.length});
  } catch (error) {
    console.error('Error retrieving uploaded data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
// Login endpoint

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by username or email
    const user = await User.findOne({ $or: [{ email }, { email: email }] });

    if (!user) {
      return res.status(404).send('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send('Invalid password');
    }

    // Include user details in the response
   

    res.status(200).json({ message: 'Login successful', user: userDetails });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Error during login');
  }
});
//data
//upload
/*

const timestampSchema = new mongoose.Schema({
  formattedDate: String,
  formattedTime: String,
  folderPath: String,
});

const Timestamp = mongoose.model('Timestamp', timestampSchema);

// Middleware
app.use(express.json());

// API Endpoints
app.post('/upload', async (req, res) => {
  const { formattedDate, formattedTime, folderPath } = req.body;

  try {
    // Save data to MongoDB
    const timestamp = new Timestamp({
      formattedDate,
      formattedTime,
      folderPath,
    });

    await timestamp.save();

    res.status(200).json({ message: 'Upload successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
*/

const multer = require('multer');
const storage = multer.memoryStorage();
const timestampSchema = new mongoose.Schema({
  userEmail: String,
  timestampFolder: String,
  imageUrls: [{
    filename: String,
    buffer: Buffer,
  }],
});

// Create a mongoose model based on the schema
const Timestamp = mongoose.model('Timestamp', timestampSchema);

// Multer configuration
const upload = multer({ storage: storage });

app.use(express.json());

app.post('/upload', upload.array('images'), async (req, res) => {
  const { userEmail, timestampFolder } = req.body;

  try {
    const timestamp = new Timestamp({
      userEmail,
      timestampFolder,
      imageUrls: req.files.map(file => ({
        filename: file.originalname,
        buffer: file.buffer,
      })),
    });

    await timestamp.save();

    res.status(200).json({ message: 'Upload successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




app.listen(port, () => {
  console.log('Server Listening on port ' + port);
});
