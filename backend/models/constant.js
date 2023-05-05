const { text } = require("express");
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const constantSchema = new Schema(
  {
    card_number: {
      type: String,
      required: true,
    },
    temperature: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    pulse: {
      type: Number,
      required: true,
    },
    blood_pressure: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "waiting",
    },
    other: {
      type: String,
      required: true,
    },
    beneficiary: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "beneficiaries",
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

constantSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Constant", constantSchema);
