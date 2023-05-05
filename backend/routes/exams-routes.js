const express = require("express");
const { check } = require("express-validator");

const examsRoutes = require("../controllers/exams-controllers");
const checkAuth = require("../middlewares/check-auth");
const pdfUpload = require("../middlewares/pdf-upload");

const router = express.Router();
router.use(checkAuth);

router.get("/", examsRoutes.getExams);
router.post("/", examsRoutes.createExams);
router.patch(
  "/results/:eid",
  pdfUpload.single("external_result"),
  examsRoutes.saveExamResult
);

module.exports = router;
