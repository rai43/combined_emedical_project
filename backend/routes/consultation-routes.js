const express = require('express');
const { check } = require('express-validator');

const consultationControllers = require('../controllers/consultation-controllers');
const checkAuth = require('../middlewares/check-auth');

const router = express.Router();

router.use(checkAuth);

router.get('/done', consultationControllers.getConsultationsDone);
router.get('/', consultationControllers.getConsultations);
router.post('/', consultationControllers.updateConsultation);

module.exports = router;
