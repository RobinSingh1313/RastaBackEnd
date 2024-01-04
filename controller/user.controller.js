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



exports.UpdatePassword = async (req, res) => {
  try {
    const { username, password } = req.params;
    if (!username || !password) {
      return res.status(400).json({ error: 'Both username and password are required for the update.' });
  n    }
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    user.password = password;
    await user.save();
    return res.status(200).json({ message: 'Password updated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};
