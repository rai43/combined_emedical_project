const { text } = require('express');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const medicationSchema = new Schema(
	{
		commercial_name: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		dci: {
			type: String,
			required: true,
		},
		therapeutic_class: {
			type: String,
			required: true,
		},
		presentation: {
			type: String,
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
			default: 0,
		},
		history: [
			{
				date: { type: Date, required: true },
				quantity: { type: Number, required: true },
			},
		],
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

medicationSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Medication', medicationSchema);
