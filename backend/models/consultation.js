const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const consultationSchema = new Schema(
  {
    comments: {
      type: String,
    },
    sickness: {
      type: String,
    },
    status: {
      type: String,
      default: "waiting",
    },
    constant: {
      type: mongoose.Types.ObjectId,
      ref: "Constant",
    },
    medical_report: {
      type: mongoose.Types.ObjectId,
      ref: "MedicalReport",
    },
    exams: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Exam",
      },
    ],
    internal_prescriptions: [
      {
        type: mongoose.Types.ObjectId,
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
    consulted_by: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    beneficiary: {
      type: mongoose.Types.ObjectId,
      ref: "beneficiaries",
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

consultationSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Consultation", consultationSchema);
