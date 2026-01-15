
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const controller = require("../controllers/auth.controller");

//router.post('/signup', controller.signupUser);
router.get('/login', controller.login);
//router.get('/identity', auth.verifyToken, controller.identity);

module.exports = router;