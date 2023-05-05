const express = require('express');
const { check } = require('express-validator');

const userControllers = require('../controllers/user-controllers');

const router = express.Router();

router.get('/gjt/:uid', userControllers.getJobTitle);
router.get('/info/:uid', userControllers.getUser);
router.get('/', userControllers.getUsers);
router.post('/', userControllers.createUser);
router.post('/login', userControllers.login);

module.exports = router;
