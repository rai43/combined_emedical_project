const express = require("express");
const { check } = require("express-validator");

const medicalCertificateRoutes = require("../controllers/medical-certificate-controllers");
const checkAuth = require("../middlewares/check-auth");
const pdfUpload = require("../middlewares/pdf-upload");

const router = express.Router();

router.use(checkAuth);
router.post("/", medicalCertificateRoutes.createMedicalCertificate);

module.exports = router;
