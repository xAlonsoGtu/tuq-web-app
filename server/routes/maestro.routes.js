//Importamos librerias
const express = require('express');
const router = express.Router();

//Importamos controllador
const maestroController = require("../controllers/maestro.controller");
const { verifyTokenAdmin } = require('../middleware/auth');

//Indicamos rutas
//Si la ruta es POST con la URL /add, entonces ejecutamos el método 'add' del controlador
//Ejecutamos las funciones middleware antes de la función del controlador
router.post('/agregar', verifyTokenAdmin, maestroController.agregar);
router.get('/buscar', verifyTokenAdmin, maestroController.buscar);

//Exportamos las nuevas rutas creadas para que puedan ser usadas por index.routes
module.exports = router;