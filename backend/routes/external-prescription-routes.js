const express = require("express");
const { check } = require("express-validator");

const externalPrescriptionsRoutes = require("../controllers/external-prescription-controllers");
const checkAuth = require("../middlewares/check-auth");
const pdfUpload = require("../middlewares/pdf-upload");

const router = express.Router();
router.use(checkAuth);

router.post("/", externalPrescriptionsRoutes.createExternalPrescription);

module.exports = router;
