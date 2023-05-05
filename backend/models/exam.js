const { text } = require("express");
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const examSchema = new Schema(
  {
    // To be taken from user || the doctor prescribes it
    examName: {
      type: String,
      required: true,
    },
    // To be filled by the agent or the exam doctor
    diagnostic: {
      type: String,
    },
    // waiting and done || by default it is waiting
    status: {
      type: String,
      default: "waiting",
    },
    // internal and external || by default it is internal
    examType: {
      type: String,
      default: "internal", // or external
    },
    // to be filled only if examType == internal
    internalResult: {
      type: String,
    },
    // to be filled only if examType == external
    externalResultPDF: {
      type: String,
    },
    // the consultation id to be saved automatically
    consultation: {
      type: mongoose.Types.ObjectId,
      ref: "Consultation",
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

examSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Exam", examSchema);
