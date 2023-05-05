const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const beneficiarySchema = new Schema(
  {
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
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    job_title: {
      type: String,
      // required: true, // no required because a "beneficiary only" could not provid this info
    },
    contract_type: {
      type: String,
      // required: true, // no required because a "beneficiary only" could not provid this info
    },
    direction: {
      type: String,
      // required: true, // no required because a "beneficiary only" could not provid this info
    },
    id_number: {
      type: String,
      required: true,
      unique: true,
    },
    blood_group: {
      type: String,
      required: true,
    },
    profil: {
      type: String,
      // required: true, // no required because a "beneficiary only" could not provid this info
    },
    index: {
      type: String,
      // required: true, // no required because a "beneficiary only" could not provid this info
    },
    remark: {
      type: String,
    },
    picture: {
      type: String,
      required: true,
    },
    agent_type: {
      type: String,
      required: true,
    },
    health_card_id: {
      type: String,
      required: true,
      unique: true,
    },
    beneficiary_of: {
      type: mongoose.Types.ObjectId,
      ref: "beneficiaries",
    },
    beneficiaries: {
      partner: {
        type: mongoose.Types.ObjectId,
        ref: "beneficiaries",
      },
      children: [
        {
          type: mongoose.Types.ObjectId,
          ref: "beneficiaries",
        },
      ],
    },
    constants: [
      {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Constant",
      },
    ],
    consultations: [
      {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Consultation",
      },
    ],
    internal_prescriptions: [
      {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "InternalPrescription",
      },
    ],
    external_prescriptions: [
      {
        type: mongoose.Types.ObjectId,
        ref: "ExternalPrescription",
      },
    ],
    medical_acts: [
      {
        type: mongoose.Types.ObjectId,
        ref: "MedicalAct",
      },
    ],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

beneficiarySchema.plugin(uniqueValidator);

module.exports = mongoose.model(
  "beneficiaries",
  beneficiarySchema,
  "beneficiaries"
);
