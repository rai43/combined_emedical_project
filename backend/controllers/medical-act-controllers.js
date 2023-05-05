const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const { json } = require("body-parser");

const InternalPrescription = require("../models/internal-prescription");
const MedicalAct = require("../models/medical_act");
const Beneficiary = require("../models/beneficiary");
const Consultation = require("../models/consultation");
const User = require("../models/user");

const getMedicalActs = async (req, res, next) => {
  let medicalActsGroupedByConsultation;
  try {
    medicalActsGroupedByConsultation = await MedicalAct.aggregate([
      {
        $match: {
          status: "waiting",
        },
      },
      {
        $group: {
          _id: "$consultation",
          medical_acts: {
            $push: "$$ROOT",
          },
        },
      },
      {
        $lookup: {
          from: "consultations",
          localField: "_id",
          foreignField: "_id",
          as: "consultation_data",
        },
      },
      {
        $unwind: {
          path: "$consultation_data",
        },
      },
      {
        $lookup: {
          from: "beneficiaries",
          localField: "consultation_data.beneficiary",
          foreignField: "_id",
          as: "beneficiary_info",
        },
      },
      {
        $unwind: {
          path: "$beneficiary_info",
        },
      },
      {
        $lookup: {
          from: "constants",
          localField: "consultation_data.constant",
          foreignField: "_id",
          as: "constant_info",
        },
      },
      {
        $unwind: {
          path: "$constant_info",
        },
      },
    ]);
    console.log(
      "medicalActsGroupedByConsultation: ",
      medicalActsGroupedByConsultation
    );
  } catch (e) {
    console.log(e);
    const error = new HttpError(
      "L'obtention de la liste des examens a échoué, veuillez réessayer plus tard.",
      500
    );
    return next(error);
  }

  res.json({
    medical_acts: medicalActsGroupedByConsultation,
  });
};

const createMedicalAct = async (req, res, next) => {
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
    // medical_act_name,
    medical_act_list,
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

  // creating the medical acts
  const medicalActsToBeSaved = medical_act_list.map((ma) => {
    return {
      ...ma,
      consultation: existingConsultation._id,
      doctor: existingUser._id,
    };
  });

  let medicalActsList;
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    medicalActsList = await MedicalAct.insertMany(medicalActsToBeSaved, {
      sess,
    });

    await Consultation.updateOne(
      { _id: existingConsultation._id },
      { $push: { medical_acts: { $each: medicalActsList } } },
      { session: sess }
    );

    // existingBeneficiary.internal_prescriptions.push(existingConsultation._id);
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
  res.status(201).json({ medicalActsList });
};

const saveMedicalResultResult = async (req, res, next) => {
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

  const { observation } = req.body;
  const medicalActId = req.params.maid;

  let existingMedicalAct;
  try {
    // IMPORTANT
    // findById does not return a promise
    // In case we want a promise, we have to call it as follow
    // Place.findById().exec()
    existingMedicalAct = await MedicalAct.findById(medicalActId);
  } catch (e) {
    const error = new HttpError(
      "Une erreur s'est produite, impossible de mettre à jour cet examen.",
      500
    );
    return next(error);
  }

  console.log(req);
  existingMedicalAct.observation = observation;
  existingMedicalAct.status = "done";

  try {
    await existingMedicalAct.save();
  } catch (e) {
    const error = new HttpError(
      "Une erreur s'est produite, impossible de mettre à jour cet examen.",
      500
    );
    return next(error);
  }

  res.status(200).json({ medicalAct: existingMedicalAct });
};

exports.getMedicalActs = getMedicalActs;
exports.createMedicalAct = createMedicalAct;
exports.saveMedicalResultResult = saveMedicalResultResult;
