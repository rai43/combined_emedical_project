const express = require("express");
const { check } = require("express-validator");

const internalPrescriptionsRoutes = require("../controllers/internal-prescription-controllers");
const checkAuth = require("../middlewares/check-auth");
const pdfUpload = require("../middlewares/pdf-upload");

const router = express.Router();
router.use(checkAuth);

router.post("/", internalPrescriptionsRoutes.createInternalPrescription);

module.exports = router;
