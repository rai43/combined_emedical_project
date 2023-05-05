const express = require('express');
const { check } = require('express-validator');

const beneficiaryControllers = require('../controllers/beneficiary-controllers');
const checkAuth = require('../middlewares/check-auth');
const fileUpload = require('../middlewares/file-upload');

const router = express.Router();

router.use(checkAuth);

router.get('/cb', beneficiaryControllers.countBeneficiaries);

module.exports = router;
