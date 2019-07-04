const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controler');

router.post('/register', userController.create);
router.post('/authenticate', userController.authenticate);

module.exports = router;