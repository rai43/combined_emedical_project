const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const { json } = require("body-parser");

const Constants = require("../models/constant");
const MedicalCertificate = require("../models/medical-certificate");
const Beneficiary = require("../models/beneficiary");
const Consultation = require("../models/consultation");
const User = require("../models/user");

const createMedicalCertificate = async (req, res, next) => {
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
    days_number,
    stop_work_extended_from,
    extention_needed_for,
    extention_extended_from,
    back_on,
    patient,
    doctor,
    consultation,
  } = req.body;

  console.log("\n\nrequest body: ", req.body);

  let existingPatient;
  let existingDoctor;
  try {
    existingPatient = await Beneficiary.findById(patient);
    existingDoctor = await User.findById(doctor);
  } catch (err) {
    console.log(1);
    const error = new HttpError(
      "Erreur lors de la prise de constant, veuillez réessayer plus tard.",
      500
    );
    return next(error);
  }

  if (!existingPatient || !existingDoctor) {
    return next(
      new HttpError(
        "Le patient ou le docteur n'existe pas, veuillez créer un bénéficiaire et réessayer.",
        422
      )
    );
  }

  let existingConsultation;
  try {
    existingConsultation = await Consultation.findById(consultation);
  } catch (err) {
    console.log(1);
    const error = new HttpError(
      "Erreur lors de la sauvegarde du certificat médical, veuillez réessayer plus tard.",
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

  let createdMedicalCertificate = new MedicalCertificate({
    days_number,
    stop_work_extended_from,
    extention_needed_for,
    extention_extended_from,
    back_on,
    patient: existingPatient._id,
    doctor: existingDoctor._id,
    consultation: existingConsultation._id,
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    existingConsultation.medical_report = createdMedicalCertificate._id;
    await existingConsultation.save({ session: sess });

    await createdMedicalCertificate.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Erreur lors de la création, veuillez réessayer plus tard.",
      500
    );
    return next(error);
  }
  res.status(201).json({ constant: createdMedicalCertificate });
};

exports.createMedicalCertificate = createMedicalCertificate;
