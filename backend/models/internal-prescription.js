const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const internalPrescriptionSchema = new Schema(
  {
    medication: {
      type: String,
      required: true,
    },
    posology: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    consultation: {
      type: mongoose.Types.ObjectId,
      ref: "Consultation",
    },
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

internalPrescriptionSchema.plugin(uniqueValidator);

module.exports = mongoose.model(
  "InternalPrescription",
  internalPrescriptionSchema
);
