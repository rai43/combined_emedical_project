const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const medicalActSchema = new Schema(
  {
    medical_act_name: {
      type: String,
      required: true,
    },
    observation: {
      type: String,
    },
    medication: [
      {
        type: String,
        required: true,
      },
    ],
    posology: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "waiting",
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

medicalActSchema.plugin(uniqueValidator);

module.exports = mongoose.model("MedicalAct", medicalActSchema);
