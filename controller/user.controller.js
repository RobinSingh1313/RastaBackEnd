// const UserService = require('../services/user.services');

const User = require('../model/user.model')

exports.register = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    // Validate required fields
    if (!username || !password) {
      return res.status(400).send('Missing required field');
    }

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).send('Username already exists');
    }

    // Create a new user
    const newUser = new User({
      username,
      password,
    });

    await newUser.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Error registering user');
  }
};
