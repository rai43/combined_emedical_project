const fs = require('fs');

const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');

const Medication = require('../models/medication');

const getMedications = async (req, res, next) => {
	let medications;

	try {
		medications = await Medication.find({}).sort({ commercial_name: 1 });
	} catch (err) {
		const error = new HttpError("L'obtention de la liste des médicaments a échoué, veuillez réessayer plus tard.", 500);
		return next(error);
	}

	res.json({
		medications,
	});
};

const createMedication = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		console.log(errors);
		return next(new HttpError('Invalid inputs passed, please check your data.', 422));
	}

	const { commercial_name, price, dci, therapeutic_class, presentation } = req.body;

	let alreadyExistingMedication;
	try {
		alreadyExistingMedication = await Medication.findOne({
			commercial_name,
		});
	} catch (err) {
		const error = new HttpError('Erreur lors de la création, veuillez réessayer plus tard.', 500);
		return next(error);
	}

	if (alreadyExistingMedication) {
		return next(new HttpError('Le nom du médicament existe déjà dans la base de donnée, veuillez vérifier les informations et réessayer.', 422));
	}

	const createdMedication = new Medication({
		commercial_name,
		price,
		dci,
		therapeutic_class,
		presentation,
	});
	try {
		createdMedication.save();
	} catch (err) {
		return next(new HttpError('Impossible de créer le médicament', 500));
	}

	res.status(201).json({ medications: createdMedication });
};

const addMedicationToStock = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		console.log(errors);
		return next(new HttpError('Invalid inputs passed, please check your data.', 422));
	}

	const { medications } = req.body;

	try {
		medications.map(async (med) => {
			console.log('\n\nSaving ', med);
			await Medication.updateOne(
				{
					commercial_name: med[0],
				},
				{ $inc: { quantity: med[1] }, $push: { history: { date: new Date(), quantity: med[1] } } }
			);
		});
	} catch (err) {
		console.log(err);
		return next(new HttpError('Impossible de créer le médicament', 500));
	}

	res.status(201).json({ medications: 'Operation terminée avec succès' });
};

exports.getMedications = getMedications;
exports.createMedication = createMedication;
exports.addMedicationToStock = addMedicationToStock;
