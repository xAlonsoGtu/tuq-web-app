//Importamos librerias
const express = require('express');
const router = express.Router();
//Importamos controllador
const authController = require("../controllers/auth.controller");

//Indicamos rutas
//Si la ruta es POST con la URL /login, entonces ejecutamos el método 'login' del controlador
router.post('/login', authController.login);

//Exportamos las nuevas rutas creadas para que puedan ser usadas por index.routes
module.exports = router;