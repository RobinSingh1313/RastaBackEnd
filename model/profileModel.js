const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema(
  {
   
    FirstName: {
      type: String,

    },
    LastName: {
      type: String
    },
    Typeofuser: {
      type: String
    },
    TypeofGovt: {
      type: String
    },
    Authority: {
      type: String
    },
    Jurisdiction: {
      type: String
    },
    Posting:{
      type: String
    },
    Designation: {
      type: String
    },
    zone: {
      type: String
    },
    Statelist:{
      type:String
    },
    Districtlist:{
      type:String
    },
   Citylist:{
      type:String
    },
    UT_name: {
      type: String
    },
    Ward:{
      type: String
    },
    Coorporation:{
      type:String
    },
    Sectors:{
      type:String
    },
    Company_Name:{
      type:String
    },
    Project_Name:{
      type:String
    },
    package_details:{
      type:String
    },
    WorkOrderNumber:{
      type:String
    },
    isVerified:{
      type: Boolean,
      default: false
    },
  },
  { collection: 'profile-data'}
);

const originalDataSchema = new mongoose.Schema(
  {
   
    FirstName: {
      type: String,

    },
    LastName: {
      type: String
    },
    Typeofuser: {
      type: String
    },
    TypeofGovt: {
      type: String
    },
    Authority: {
      type: String
    },
    Jurisdiction: {
      type: String
    },
    Posting:{
      type: String
    },
    Designation: {
      type: String
    },
    zone: {
      type: String
    },
    Statelist:{
      type:String
    },
    Districtlist:{
      type:String
    },
   Citylist:{
      type:String
    },
    UT_name: {
      type: String
    },
    Ward:{
      type: String
    },
    Coorporation:{
      type:String
    },
    Sectors:{
      type:String
    },
    Company_Name:{
      type:String
    },
    Project_Name:{
      type:String
    },
    package_details:{
      type:String
    },
    WorkOrderNumber:{
      type:String
    },
    isVerified:{
      type: Boolean,
      default: false
    },
  },
  { collection: 'Original-data'}
);
const ProfileModel = mongoose.model('ProfileData', ProfileSchema);
const OriginalModel = mongoose.model('OriginalData', originalDataSchema);

module.exports = {
  ProfileModel,
  OriginalModel,
 };