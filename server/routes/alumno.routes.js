
const express = require('express');
const router = express.Router();

const alumnoController = require("../controllers/alumno.controller");
const { verifyTokenAdmin } = require('../middleware/auth');

router.post('/agregar', verifyTokenAdmin, alumnoController.agregar);

module.exports = router;