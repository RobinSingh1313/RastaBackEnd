const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');

const bcrypt = require('bcrypt');
const path = require('path'); // Add this line
const uuid = require('uuid');
//const cors = require('cors'); // Add this line
const Image=require('./model/imageschema');

const User = require('./model/user.model');
const app = express();
const port = 3000;
 //mongoDbUrl =  'mongodb+srv://rasta:aiunika123@rastaai.owxfyuz.mongodb.net/rasta_ai?retryWrites=true&w=majority';
 mongoDbUrl =  'mongodb://127.0.0.1:27017/rasta_ai';
const userrouter = require('./routers/userrouter')
//app.use(cors());
const profileRoutes = require('./routers/profileRoutes')
app.use(express.json());
app.use('/',userrouter)

app.use('/',profileRoutes)
mongoose.connect(mongoDbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

// Registration endpoint
// Registration endpoint
/*
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
});*/
//new user
// Registration endpoint
// app.post('/newregister', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     // Validate required fields
//     if (!username || !password) {
//       return res.status(400).send('Missing required fields');
//     }

//     // Create a new user
//     const newUser = new User({
//       username,
//       password,
//     });

//     await newUser.save();
//     res.status(201).send('User registered successfully');
//   } catch (error) {
//     console.error('Error registering user:', error);
//     res.status(500).send('Error registering user');
//   }
// });




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
  const { username, password } = req.body;
  console.log('Received login request with username:', username, 'and password:', password);

  try {
    // Find the user by email
    const user = await User.findOne({ username,password });

    if (!user) {
      return res.status(404).send('User not found');
    }

    // Simple password comparison
    if (password !== user.password) {
      return res.status(401).send('Invalid password');
    }

    // Include user details in the response
    const userDetails = {
      id: user._id,
      username: user.username,
      password: user.password
      // Add more user details as needed
    };

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
/*
        ..fields['roadType'] = userData['roadType']
        ..fields['startChainage'] = userData['startChainage']
        ..fields['endChainage'] = userData['endChainage']
        ..fields['juniorExecutiveName'] = userData['juniorExecutiveName']
        ..fields['chainageRadioValue'] =
            userData['chainageRadioValue'].toString()
        ..fields['batteryLifeChecked'] =
            userData['batteryLifeChecked'].toString()
        ..fields['chainageChecked'] = userData['chainageChecked'].toString()
        ..fields['termsAndConditionsChecked'] =
            userData['termsAndConditionsChecked'].toString()
        ..fields['privacyChecked'] = userData['privacyChecked'].toString()
        ..fields['faQChecked'] = userData['faQChecked'].toString()
*/
const multer = require('multer');
const timestampSchema = new mongoose.Schema({
  userEmail: String,
  timestampFolder: String,
  roadCategory: String,
  roadType: String,
  startChainage: String,
  endChainage: String,
  juniorExecutiveName: String,
  chainageRadioValue: String,
  batteryLifeChecked: Boolean,
  chainageChecked: Boolean,
  termsAndConditionsChecked: Boolean,
  privacyChecked: Boolean,
  faQChecked: Boolean,
  imageUrls: [
    {
      filename: String,
      buffer: Buffer,
    },
  ],
});


// Create a mongoose model based on the schema
const Timestamp = mongoose.model('Timestamp', timestampSchema);

// Multer configuration
const storage = multer.memoryStorage();

// const upload = multer({
//   storage: storage,
//   limits: { fieldSize: 50 * 1024 * 1024 } // 25 MB limit (adjust as needed)
// });

app.use(express.json());

const fileFilter = (req, file, cb) => {
  // Exclude files with the name 'data.json'
  if (file.originalname === 'data.json') {
    return cb(null, false);
  }
  cb(null, true);
};


// app.post('/uploads', upload.array('images'), async (req, res) => {
//   const {
//     userEmail,
//     timestampFolder,
//     roadCategory,
//     roadType,
//     startChainage,
//     endChainage,
//     juniorExecutiveName,
//     chainageRadioValue,
//     batteryLifeChecked,
//     chainageChecked,
//     termsAndConditionsChecked,
//     privacyChecked,
//     faQChecked,
//   } = req.body;

//   try {

//     const timestamp = new Timestamp({
//       userEmail,
//       timestampFolder,
//       roadCategory,
//       roadType,
//       startChainage,
//       endChainage,
//       juniorExecutiveName,
//       chainageRadioValue,
//       batteryLifeChecked,
//       chainageChecked,
//       termsAndConditionsChecked,
//       privacyChecked,
//       faQChecked,
//       imageUrls: req.files.map(file => ({
//         filename: file.originalname,
//         buffer: file.buffer,
//       })),
//     });

//     console.log('Request body:', req.body);

//     await timestamp.save();

//     res.status(200).json({ message: 'Upload successful' });
//   } catch (error) {
//     console.log('Request body:', req.body);

//     console.error('Error during upload:', error);
//     console.log('Request body:', req.body);

//     if (error.name === 'ValidationError') {
//       // Log validation errors separately
//       console.error('Validation Errors:', error.errors);
//       res.status(400).json({ message: 'Validation failed', errors: error.errors });
//     } else {
//       console.log('Request body:', req.body);

//       res.status(500).json({ message: 'Internal server error' });
//     }
//   }
// });


const upload = multer({ storage: storage });
app.post('/uploads', upload.array('paper'), async (req, res) => {
  try {
    const files = req.files;
    const uploadId = uuid.v4(); // Generate a unique ID for this upload session

    // Create an array to store images
    const imagesArray = [];

    for (const file of files) {
      // Ensure the buffer size is sufficient for the file data
      const buffer = Buffer.alloc(file.buffer.length);
      file.buffer.copy(buffer);

      imagesArray.push({
        filename: file.originalname,
        data: buffer,
      });
    }

    console.log('Before Image.create:', imagesArray); // Log the data before saving to MongoDB

    await Image.create({
      uniqueId: uploadId,
      userEmail: req.body.userEmail,
      timestampFolder: req.body.timestampFolder,
      roadCategory: req.body.roadCategory,
      roadType: req.body.roadType,
      startChainage: req.body.startChainage,
      endChainage: req.body.endChainage,
      juniorExecutiveName: req.body.juniorExecutiveName,
      chainageRadioValue: req.body.chainageRadioValue,
      batteryLifeChecked: req.body.batteryLifeChecked,
      chainageChecked: req.body.chainageChecked,
      termsAndConditionsChecked: req.body.termsAndConditionsChecked,
      privacyChecked: req.body.privacyChecked,
      faQChecked: req.body.faQChecked,
      images: imagesArray,
    });

    console.log('After Image.create: Data saved successfully');

    res.status(200).send('Files uploaded successfully');
  } catch (error) {
    console.error('Error during file upload:', error);
    res.status(500).send('Internal Server Error');
  }
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


