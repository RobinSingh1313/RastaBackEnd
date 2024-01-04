const express = require('express');
const router = express.Router();

const profileController = require('../controller/profileController');

router.post('/profile', profileController.addDetails);
router.get('/getdata/:Username',profileController.getData);
router.post('/data',profileController.add)
// router.route('/updating/:Username')
//  .get( profileController.handleProfile)
//   .put(profileController.handleProfile);

module.exports = router;