const fs = require('fs');

const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const { json } = require('body-parser');

const Beneficiaries = require('../models/beneficiary');

const countBeneficiaries = async (req, res, next) => {
	let count = 0;
	try {
		count = await Beneficiaries.count({});
	} catch (e) {
		const error = new HttpError("L'obtention de la liste des bénéficiaires a échoué, veuillez réessayer plus tard.", 500);
		return next(error);
	}

	res.json({
		count,
	});
};

const getBeneficiaries = async (req, res, next) => {
	let beneficiaries;
	try {
		beneficiaries = await Beneficiaries.find({ agent_type: 'AGENT' })
			.sort({
				created_at: -1,
			})
			.populate({
				path: 'beneficiaries.partner',
			})
			.populate({
				path: 'beneficiaries.children',
			});
	} catch (e) {
		const error = new HttpError("L'obtention de la liste des bénéficiaires a échoué, veuillez réessayer plus tard.", 500);
		return next(error);
	}

	res.json({
		beneficiaries,
	});
};

const createBeneficiary = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		console.log(errors);
		return next(new HttpError('Invalid inputs passed, please check your data.', 422));
	}

	const { family_name, first_name, dob, doc, doe, gender, id_number, job_title, direction, contract_type, blood_group, profil, remark, index, agent_type, beneficiary_of } = req.body;

	let existingAgent;

	if (agent_type === 'AGENT') {
		if (!direction || !contract_type || !id_number || !profil || !index) {
			return next(new HttpError("Veuillez informer completement le formulaire pour créer le compte d'un agent", 422));
		}
	} else {
		console.log('beneficiary_of: ', beneficiary_of);
		try {
			existingAgent = await Beneficiaries.findOne({
				id_number: beneficiary_of,
			});
		} catch (err) {
			console.log(1);
			const error = new HttpError('Erreur lors de la création, veuillez réessayer plus tard.', 500);
			return next(error);
		}

		if (!existingAgent) {
			console.log('return');
			return next(new HttpError("L'agent n'existe pas, veuillez vérifier les informations de l'agent et réessayer.", 422));
		}
	}
	// if it is a new 'AGENT', we should assign it's object to existingAgent
	console.log('id_number: ', id_number);
	let createdBeneficiary;
	try {
		createdBeneficiary = new Beneficiaries({
			family_name,
			first_name,
			dob,
			doc,
			doe,
			gender,
			id_number,
			job_title,
			direction,
			contract_type,
			blood_group,
			profil,
			remark,
			index,
			agent_type,
			picture: req.file.path,
			creator: req.userData.userId,
		});
		let health_card_id = agent_type === 'AGENT' ? id_number : existingAgent.id_number;
		if (agent_type === 'AGENT') {
			console.log('\n\nIN HERE');
			existingAgent = createdBeneficiary;
			health_card_id += ' 01';
		} else if (agent_type === 'CONJOINT') {
			health_card_id += ' 02';
			// in this case, we need to PUSH the the "createdBeneficiary" object
			// in "existingAgent.beneficiaries.partner"
		} else if (agent_type === 'ENFANT') {
			const childrenCount = existingAgent.beneficiaries.children.length;
			health_card_id += ' 1' + childrenCount;
			// in this case, we need to PUSH the the "createdBeneficiary" object
			// in "existingAgent.beneficiaries.children"
		}
		// updating the 'beneficiary_of' field
		createdBeneficiary.beneficiary_of = existingAgent._id;
		// updating the 'health_card_id' field
		createdBeneficiary.health_card_id = health_card_id;
		console.log('\n\nIN HERE2\n\n', existingAgent);
		//   // await createdBeneficiary.save();
		//   // console.log(createdBeneficiary);

		try {
			const sess = await mongoose.startSession();
			sess.startTransaction();
			if (agent_type === 'AGENT') {
				existingAgent.beneficiaries = {
					children: [],
				};
				// await existingAgent.save({ session: sess });
			} else if (agent_type === 'CONJOINT') {
				existingAgent.beneficiaries.partner = createdBeneficiary._id;
				// await existingAgent.save({ session: sess });
			} else if (agent_type === 'ENFANT') {
				existingAgent.beneficiaries.children.push(createdBeneficiary._id);
			}
			console.log('existingAgent', existingAgent);
			await existingAgent.markModified('beneficiaries');
			await existingAgent.save({ session: sess });
			await createdBeneficiary.save({ session: sess });
			// commit all the changes at once. If any error, then all operations
			// are cancelled
			await sess.commitTransaction();
		} catch (err) {
			console.log('this error is generated in beneficiary contollers POST');
			console.log(err);
			const error = new HttpError('Erreur lors de la création, veuillez réessayer plus tard.', 500);
			return next(error);
		}
	} catch (err) {
		console.log(err);
		const error = new HttpError("Échec de l'enregistrement, veuillez réessayer plus tard.", 500);
		return next(error);
	}
	res.status(201).json({ beneficiary: createdBeneficiary });
};

exports.getBeneficiaries = getBeneficiaries;
exports.countBeneficiaries = countBeneficiaries;
exports.createBeneficiary = createBeneficiary;
