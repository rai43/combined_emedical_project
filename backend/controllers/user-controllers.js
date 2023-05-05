const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const getJobTitle = async (req, res, next) => {
	const userId = req.params.uid;
	let user;
	try {
		user = await User.findById(userId);
	} catch (e) {
		const error = new HttpError("L'obtention des informations de l'utilisateur a échoué, veuillez réessayer plus tard.", 500);
		return next(error);
	}

	if (!user) {
		const error = new HttpError("L'utilisateur n'existe pas dans la base de donnée", 500);
		return next(error);
	}

	console.log('getUser: ', user);

	res.json({
		job_title: user.job_title,
	});
};

const getUser = async (req, res, next) => {
	const userId = req.params.uid;
	let user;
	try {
		user = await User.findById(userId);
	} catch (e) {
		const error = new HttpError("L'obtention des informations de l'utilisateur a échoué, veuillez réessayer plus tard.", 500);
		return next(error);
	}

	if (!user) {
		const error = new HttpError("L'utilisateur n'existe pas dans la base de donnée", 500);
		return next(error);
	}

	console.log('getUser: ', user);

	res.json({
		user,
	});
};

const getUsers = async (req, res, next) => {
	let users;
	try {
		users = await User.find().sort({
			created_at: -1,
		});
	} catch (e) {
		const error = new HttpError("L'obtention de la liste des utilisateur a échoué, veuillez réessayer plus tard.", 500);
		return next(error);
	}

	res.json({
		users,
	});
};

const createUser = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		console.log(errors);
		return next(new HttpError('Invalid inputs passed, please check your data.', 422));
	}

	const { family_name, first_name, dob, doc, doe, gender, id_number, job_title, direction, contract_type, blood_group, profil, remark, index, email, password, profil_type } = req.body;

	let existingAgent;
	try {
		existingAgent = await User.findOne({
			id_number: id_number,
		});
	} catch (err) {
		console.log(1);
		const error = new HttpError('Erreur lors de la création, veuillez réessayer plus tard.', 500);
		return next(error);
	}

	if (existingAgent) {
		console.log('return');
		return next(new HttpError("L'utilisateur existe déjà, veuillez vous connecter à la place.", 422));
	}

	let hashedPassword;
	try {
		hashedPassword = await bcrypt.hash(password, 12);
	} catch (err) {
		const error = new HttpError("Impossible de créer l'utilisateur, veuillez réessayer.", 500);
		return next(error);
	}

	let createdUser;
	try {
		createdUser = new User({
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
			email,
			password: hashedPassword,
			profil_type,
		});
		await createdUser.save();
	} catch (err) {
		console.log(err);
		const error = new HttpError("Échec de l'enregistrement, veuillez réessayer plus tard.", 500);
		return next(error);
	}
	res.status(201).json({ user: createdUser });
};

const login = async (req, res, next) => {
	console.log(req.body);
	const { loginId, password } = req.body;

	let existingUser;

	try {
		existingUser = await User.findOne({ email: loginId }).select('+password');
	} catch (err) {
		return res.json({
			error: {
				message: 'La connexion a échoué, veuillez réessayer plus tard.',
				code: -3,
			},
		});
	}

	if (!existingUser) {
		return res.json({
			error: {
				message: 'Identifiants invalides, impossible de vous connecter.',
				code: -2,
			},
		});
	}

	let isValidPassword = false;
	try {
		isValidPassword = await bcrypt.compare(password, existingUser.password);
	} catch (err) {
		return res.json({
			error: {
				message: "Impossible de vous connecter, veuillez vérifier vos informations d'identification et réessayer.",
				code: -3,
			},
		});
	}

	if (!isValidPassword) {
		return res.json({
			error: {
				message: 'Le mot de passe est invalide, impossible de vous connecter.',
				code: -2,
			},
		});
	}

	let token;
	try {
		token = jwt.sign(
			{
				userId: existingUser._id,
				email: existingUser.email,
				id_number: existingUser.id_number,
				profil_type: existingUser.profil_type,
			},
			'supersecret_dont_share', // private key
			{ expiresIn: '24h' }
		);
	} catch (err) {
		return res.json({
			error: {
				message: 'La connexion a échoué, veuillez réessayer plus tard.',
				code: -2,
			},
		});
	}

	res.json({
		userId: existingUser.id,
		email: existingUser.email,
		id_number: existingUser.id_number,
		profil_type: existingUser.profil_type,
		token: token,
	});
};

exports.getJobTitle = getJobTitle;
exports.getUser = getUser;
exports.getUsers = getUsers;
exports.createUser = createUser;
exports.login = login;
