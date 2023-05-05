const express = require('express');
const { check } = require('express-validator');

const medicationRoutes = require('../controllers/medication-controllers');
const checkAuth = require('../middlewares/check-auth');
const pdfUpload = require('../middlewares/pdf-upload');

const router = express.Router();

router.use(checkAuth);
router.get('/', medicationRoutes.getMedications);
router.post('/', medicationRoutes.createMedication);
router.patch('/ats', medicationRoutes.addMedicationToStock);

module.exports = router;
