const UserService = require('../services/user.services');
exports.register = async (req, res, next) => {
    try {
      const {  username, email, password,designation, idCardImagePath, profileImagePath} = req.body;
  
      // Validate that required fields are present
      if (!username || !email || !designation || !password ||!idCardImagePath ||!profileImagePath ||!designation) {
        return res.status(400).json({ status: false, error: 'Missing required fields' });
      }
  
      const successRes = await UserService.registerUser(email, password);
      res.json({ status: true, success: "User registered successfully" });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ status: false, error: 'Error during registration' });
    }
  };
  