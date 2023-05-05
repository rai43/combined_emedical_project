const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const { json } = require("body-parser");

const ExternalPrescription = require("../models/external-prescription");
const Beneficiary = require("../models/beneficiary");
const Consultation = require("../models/consultation");
const User = require("../models/user");

const createExternalPrescription = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError(
        "Entrées non valides transmises, veuillez vérifier vos données.",
        422
      )
    );
  }

  const {
    // medication,
    // posology,
    // duration,
    // quatity,
    prescription_list,
    consultation_id,
    consulted_by,
  } = req.body;

  let existingUser;
  try {
    existingUser = await User.findById(consulted_by, { _id: 1 });
  } catch (err) {
    const error = new HttpError(
      "Erreur lors de la création, veuillez réessayer plus tard.",
      500
    );
    return next(error);
  }

  if (!existingUser) {
    return next(
      new HttpError(
        "Le medecin n'existe pas, veuillez créer un utilisateur et réessayer.",
        422
      )
    );
  }

  let existingConsultation;
  try {
    existingConsultation = await Consultation.findById(consultation_id);
  } catch (err) {
    const error = new HttpError(
      "Erreur lors de la création des ordonnances, veuillez réessayer plus tard.",
      500
    );
    return next(error);
  }

  if (!existingConsultation) {
    return next(
      new HttpError(
        "La consultation n'existe pas, veuillez créer une consultation et réessayer.",
        422
      )
    );
  }

  // creating the prescriptions
  const prescriptionsToBeSaved = prescription_list.map((prescription) => {
    return {
      ...prescription,
      consultation: existingConsultation._id,
      doctor: existingUser._id,
    };
  });

  let prescriptionsList;
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    prescriptionsList = await ExternalPrescription.insertMany(
      prescriptionsToBeSaved,
      { sess }
    );

    await Consultation.updateOne(
      { _id: existingConsultation._id },
      { $push: { external_prescriptions: { $each: prescriptionsList } } },
      { session: sess }
    );

    // existingBeneficiary.external_prescriptions.push(existingConsultation._id);
    // await existingBeneficiary.save({ session: sess });

    await sess.commitTransaction();
  } catch (err) {
    console.log(3);
    console.log(err);
    const error = new HttpError(
      "Erreur lors de la création, veuillez réessayer plus tard.",
      500
    );
    return next(error);
  }
  res.status(201).json({ prescriptionsList });
};

exports.createExternalPrescription = createExternalPrescription;
