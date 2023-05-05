const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const { json } = require('body-parser');

const Constant = require('../models/constant');
const Exam = require('../models/exam');
const Beneficiary = require('../models/beneficiary');
const Consultation = require('../models/consultation');
const User = require('../models/user');

const getExams = async (req, res, next) => {
	let examsGroupedByConsultation;
	try {
		examsGroupedByConsultation = await Exam.aggregate([
			{
				$match: {
					status: 'waiting',
				},
			},
			{
				$group: {
					_id: '$consultation',
					examsList: {
						$push: '$$ROOT',
					},
				},
			},
			{
				$lookup: {
					from: 'consultations',
					localField: '_id',
					foreignField: '_id',
					as: 'consultation_data',
				},
			},
			{
				$unwind: {
					path: '$consultation_data',
				},
			},
			{
				$lookup: {
					from: 'beneficiaries',
					localField: 'consultation_data.beneficiary',
					foreignField: '_id',
					as: 'beneficiary_info',
				},
			},
			{
				$unwind: {
					path: '$beneficiary_info',
				},
			},
			{
				$lookup: {
					from: 'constants',
					localField: 'consultation_data.constant',
					foreignField: '_id',
					as: 'constant_info',
				},
			},
			{
				$unwind: {
					path: '$constant_info',
				},
			},
		]);
		console.log('examsGroupedByConsultation: ', examsGroupedByConsultation);
	} catch (e) {
		console.log(e);
		const error = new HttpError("L'obtention de la liste des examens a échoué, veuillez réessayer plus tard.", 500);
		return next(error);
	}

	res.json({
		exams: examsGroupedByConsultation,
	});
};

const createExams = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		console.log(errors);
		return next(new HttpError('Entrées non valides transmises, veuillez vérifier vos données.', 422));
	}

	const { exams_list, constant_id, consultation_id, consulted_by } = req.body;

	let existingConstant;
	// let existingBeneficiary;
	try {
		console.log(constant_id);
		existingConstant = await Constant.findById(constant_id).populate('beneficiary');
		// existingBeneficiary = await Beneficiary.findOne({
		// 	_id: existingConstant.beneficiary._id,
		// });
	} catch (err) {
		console.log(1);
		const error = new HttpError('Erreur lors de la création, veuillez réessayer plus tard.', 500);
		return next(error);
	}

	if (!existingConstant) {
		return next(new HttpError("Les constantes n'existe pas, veuillez créer des constantes et réessayer.", 422));
	}

	let existingUser;
	try {
		existingUser = await User.findById(consulted_by, { _id: 1 });
	} catch (err) {
		console.log(2);
		console.log(consulted_by);
		const error = new HttpError('Erreur lors de la création, veuillez réessayer plus tard.', 500);
		return next(error);
	}

	if (!existingUser) {
		return next(new HttpError("Le medecin n'existe pas, veuillez créer un utilisateur et réessayer.", 422));
	}

	let existingConsultation;
	try {
		existingConsultation = await Consultation.findById(consultation_id);
	} catch (err) {
		const error = new HttpError('Erreur lors de la création des examens, veuillez réessayer plus tard.', 500);
		return next(error);
	}

	if (!existingConsultation) {
		return next(new HttpError("La consultation n'existe pas, veuillez créer une consultation et réessayer.", 422));
	}

	// creating the exams
	const examListToBeSaved = exams_list.map((examObj) => {
		return {
			...examObj,
			consultation: existingConsultation._id,
		};
	});

	let examsList;
	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		examsList = await Exam.insertMany(examListToBeSaved, { sess });

		await Consultation.updateOne({ _id: existingConsultation._id }, { $push: { exams: { $each: examsList } } }, { session: sess });

		// existingBeneficiary.consultations.push(existingConsultation._id);
		// await existingBeneficiary.save({ session: sess });

		await sess.commitTransaction();
	} catch (err) {
		console.log(3);
		console.log(err);
		const error = new HttpError('Erreur lors de la création, veuillez réessayer plus tard.', 500);
		return next(error);
	}
	res.status(201).json({ exams: examsList });
};

const saveExamResult = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		console.log(errors);
		return next(new HttpError('Entrées non valides transmises, veuillez vérifier vos données.', 422));
	}

	const { internal_result } = req.body;
	const examId = req.params.eid;

	let existingExam;
	try {
		// IMPORTANT
		// findById does not return a promise
		// In case we want a promise, we have to call it as follow
		// Place.findById().exec()
		existingExam = await Exam.findById(examId);
	} catch (e) {
		const error = new HttpError("Une erreur s'est produite, impossible de mettre à jour cet examen.", 500);
		return next(error);
	}

	console.log('existingExam.examType: ', existingExam.examType);
	if (existingExam.examType === 'INTERNAL') {
		console.log('in if');
		existingExam.internalResult = internal_result;
	} else if (existingExam.examType === 'EXTERNAL') {
		console.log('in else if');
		console.log('req.file.path::: ', req.file.path);
		existingExam.externalResultPDF = req.file.path;
	}
	existingExam.status = 'done';

	try {
		await existingExam.save();
	} catch (e) {
		const error = new HttpError("Une erreur s'est produite, impossible de mettre à jour cet examen.", 500);
		return next(error);
	}

	res.status(200).json({ exam: existingExam });
};

exports.getExams = getExams;
exports.createExams = createExams;
exports.saveExamResult = saveExamResult;
