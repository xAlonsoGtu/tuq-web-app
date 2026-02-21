//Importamos librerias
const express = require('express');
const router = express.Router();

//Agregamos nueva ruta
router.use('/auth', require('./auth.routes'));
router.use('/maestro', require('./maestro.routes'));
router.use('/alumno', require('./alumno.routes'));
router.use('/empleados', require('./empleados.routes'));

//Exportamos rutas que serán usadas por el archivo index.js
module.exports = router;