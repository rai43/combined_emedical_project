const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const { json } = require('body-parser');

const Constants = require('../models/constant');
const Beneficiary = require('../models/beneficiary');
const Consultation = require('../models/consultation');

const getConstants = async (req, res, next) => {
	let constants;
	try {
		constants = await Constants.find({ status: 'waiting' })
			.populate({
				path: 'beneficiary',
				populate: {
					path: 'consultations',
					populate: {
						path: 'constant',
					},
				},
			})
			.sort({
				created_at: 1,
			});
		console.log(constants.length);
	} catch (e) {
		const error = new HttpError("L'obtention de la liste des constantes a échoué, veuillez réessayer plus tard.", 500);
		return next(error);
	}

	res.json({
		constants,
	});
};

const createConstant = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		console.log(errors);
		return next(new HttpError('Entrées non valides transmises, veuillez vérifier vos données.', 422));
	}

	const { card_number, temperature, height, weight, pulse, blood_pressure, other } = req.body;

	let existingBeneficiary;
	try {
		console.log(card_number);
		existingBeneficiary = await Beneficiary.findOne({
			health_card_id: card_number,
		});
	} catch (err) {
		console.log(1);
		const error = new HttpError('Erreur lors de la prise de constant, veuillez réessayer plus tard.', 500);
		return next(error);
	}

	if (!existingBeneficiary) {
		return next(new HttpError("Le bénéficiaire n'existe pas, veuillez créer un bénéficiaire et réessayer.", 422));
	}

	let createdConstant = new Constants({
		card_number,
		temperature,
		height,
		weight,
		pulse,
		blood_pressure,
		other,
		beneficiary: existingBeneficiary._id,
	});

	// creating the consultation
	let createdConsultation = new Consultation({
		constant: createdConstant._id,
		beneficiary: existingBeneficiary._id,
	});

	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		existingBeneficiary.constants.push(createdConstant._id);
		existingBeneficiary.consultations.push(createdConsultation._id);
		await existingBeneficiary.save({ session: sess });

		await createdConstant.save({ session: sess });

		await createdConsultation.save({ session: sess });

		await sess.commitTransaction();
	} catch (err) {
		console.log(err);
		const error = new HttpError('Erreur lors de la création, veuillez réessayer plus tard.', 500);
		return next(error);
	}
	res.status(201).json({ constant: createdConstant });
};

exports.getConstants = getConstants;
exports.createConstant = createConstant;
