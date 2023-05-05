const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  family_name: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  doc: {
    type: Date,
    required: true,
  },
  doe: {
    type: Date,
    // required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  id_number: {
    type: String,
    required: true,
    unique: true,
  },
  job_title: {
    type: String,
    required: true,
  },
  direction: {
    type: String,
    required: true,
  },
  contract_type: {
    type: String,
    required: true,
  },
  blood_group: {
    type: String,
    required: true,
  },
  profil: {
    type: String,
    required: true,
  },
  remark: {
    type: String,
    // required: true,
  },
  index: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    select: false,
  },
  profil_type: {
    type: String,
    required: true,
  },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
