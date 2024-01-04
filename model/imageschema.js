const mongoose = require('mongoose');
const imageSchema = new mongoose.Schema({
    uniqueId: String,
    userEmail: String,
    timestampFolder: String,
    
    roadCategory: String,
    roadType: String,
    startChainage: String,
    endChainage: String,
    juniorExecutiveName: String,
    chainageRadioValue: String,
    batteryLifeChecked: String,
    chainageChecked: String,
    termsAndConditionsChecked: String,
    privacyChecked: String,
    faQChecked: String,
    // ... other fields
    images: [
      {
        filename: String,
        data: Buffer,
      },
    ],
  });
const Image = mongoose.model('paper', imageSchema);

module.exports = Image;
