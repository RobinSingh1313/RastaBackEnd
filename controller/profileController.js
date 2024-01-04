const ProfileSchema = require('../model/profileModel');

const OriginalModel = require('../model/profileModel')

const addDetails = async (req, res) => {
  try {
    // Check if the Username already exists
    const existingProfile = await ProfileSchema.ProfileModel.findOne({
      Username: req.body.Username,
    });

    if (existingProfile) {
      // Username already exists, send an error response
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Create and save the new profile
    const newProfile = new ProfileSchema.ProfileModel(req.body);
    // const savedProfile = await newProfile.save();
    const savedProfile = await Profile.create(newProfile);


    res.status(201).json(savedProfile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//   try {
//     const newDeatils = new ProfileSchema({
//       FirstName: req.body.FirstName,
//       LastName: req.body.LastName,
//       Typeofuser: req.body.Typeofuser,
//       TypeofGovt: req.body.TypeofGovt,
//       Authority: req.body.Authority,
//       Jurisdiction: req.body.Jurisdiction,
//       Posting: req.body.Posting,
//       Designation: req.body.Designation,
//       zone: req.body.zone,
//       Statelist: req.body.Statelist,
//       Districtlist: req.body.Districtlist,
//       citylist: req.body.citylist,
//       UT_name: req.body.UT_name,
//       Ward: req.body.Ward,
//       Coorporation: req.body.Coorporation,
//       Sectors: req.body.Sectors,
//       Company_Name: req.body.Company_Name,
//       Project_Name: req.body.Project_Name,
//       package_details: req.body.package_details,
//       WorkOrderNumber: req.body.WorkOrderNumber,
//       isVerified: false,
//     });
//     await newDeatils.save();
//     res.json({ status: 'ok', user: newDeatils });
//   } catch (error) {
//     res.json({ status: 'error', error: 'User creation failed' });
//   }
// };

const getData = async (req, res) => {
  try {
    const Username = req.params.Username;
    const profile = await ProfileSchema.find({ Username });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const originalDataSchema = require('../model/profileModel')


const add = async (req, res) => {
 
try {
  // Check if the Username already exists
  const existingProfile = await originalDataSchema.OriginalModel.findOne({
    Username: req.body.Username,
  });

  if (existingProfile) {
    // Username already exists, send an error response
    return res.status(400).json({ error: 'Username already exists' });
  }

  // Create and save the new profile
  const newProfile = new originalDataSchema.OriginalModel(req.body);
  const savedProfile = await newProfile.save();

  res.status(201).json(savedProfile);
} catch (error) {
  res.status(500).json({ error: error.message });
}
};

module.exports = {
  addDetails,
  getData,
  add,
};
