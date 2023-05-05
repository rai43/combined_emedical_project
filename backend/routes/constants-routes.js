const express = require("express");
const { check } = require("express-validator");

const constantControllers = require("../controllers/constants-controllers");
const checkAuth = require("../middlewares/check-auth");
const fileUpload = require("../middlewares/file-upload");

const router = express.Router();

router.use(checkAuth);

router.get("/", constantControllers.getConstants);
router.post("/", constantControllers.createConstant);

module.exports = router;
