const express = require('express');
const { check } = require('express-validator');

const beneficiaryControllers = require('../controllers/beneficiary-controllers');
const checkAuth = require('../middlewares/check-auth');
const fileUpload = require('../middlewares/file-upload');

const router = express.Router();

router.use(checkAuth);

// router.post(
//   "/",
//   fileUpload.single("image"),
//   [
//     check("title").not().isEmpty(),
//     check("description").isLength({ min: 5 }),
//     check("address").not().isEmpty(),
//   ],
//   placesControllers.createPlace
// );

// router.get("/", beneficiaryControllers.testing);
router.get('/count', beneficiaryControllers.getBeneficiaries);
router.get('/', beneficiaryControllers.getBeneficiaries);
router.post('/', fileUpload.single('picture'), beneficiaryControllers.createBeneficiary);

module.exports = router;
