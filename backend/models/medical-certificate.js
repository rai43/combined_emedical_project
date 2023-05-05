const { text } = require("express");
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const medicalCertificateSchema = new Schema(
  {
    patient: {
      type: mongoose.Types.ObjectId,
      ref: "beneficiaries",
    },
    days_number: {
      type: Number,
      required: true,
    },
    stop_work_extended_from: {
      type: Date,
    },
    extention_needed_for: {
      type: Number,
    },
    extention_extended_from: {
      type: Date,
    },
    back_on: {
      type: Date,
      required: true,
    },
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    consultation: {
      type: mongoose.Types.ObjectId,
      ref: "Consultation",
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

medicalCertificateSchema.plugin(uniqueValidator);

module.exports = mongoose.model("MedicalReport", medicalCertificateSchema);
