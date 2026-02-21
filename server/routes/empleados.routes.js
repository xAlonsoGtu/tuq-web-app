
const express = require('express');
const router = express.Router();

const empleadosController = require("../controllers/empleados.controllers");
const { verifyTokenAdmin } = require('../middleware/auth');

router.post('/agregar', verifyTokenAdmin, empleadosController.agregar);

module.exports = router;