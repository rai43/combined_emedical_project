const express = require("express");
const { check } = require("express-validator");

const medicalActRoutes = require("../controllers/medical-act-controllers");
const checkAuth = require("../middlewares/check-auth");
const pdfUpload = require("../middlewares/pdf-upload");

const router = express.Router();
router.use(checkAuth);

router.get("/", medicalActRoutes.getMedicalActs);
router.post("/", medicalActRoutes.createMedicalAct);
router.patch("/results/:maid", medicalActRoutes.saveMedicalResultResult);

module.exports = router;
