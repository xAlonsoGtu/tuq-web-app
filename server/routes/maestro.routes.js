//Importamos librerias
const express = require('express');
const router = express.Router();
const upload = require("../providers/multer");

//Importamos controllador
const maestroController = require("../controllers/maestro.controller");
const { verifyTokenAdmin } = require('../middleware/auth');

//Indicamos rutas
//Si la ruta es POST con la URL /add, entonces ejecutamos el método 'add' del controlador
//Ejecutamos las funciones middleware antes de la función del controlador
router.post('/agregar', verifyTokenAdmin, maestroController.agregar);

//Rutas con PUT
router.put('/editar', verifyTokenAdmin, maestroController.editar);
router.put('/status', verifyTokenAdmin, maestroController.editarStatus);

//Ruta con DELETE
router.delete('/eliminar/:id', verifyTokenAdmin, maestroController.eliminar);

//Ruta con GET
router.get('/buscar', verifyTokenAdmin, maestroController.buscar);
router.get('/:id', verifyTokenAdmin, maestroController.obtener);

//Img form
router.post('/perfil', upload.single('file'), maestroController.perfil);


//Exportamos las nuevas rutas creadas para que puedan ser usadas por index.routes
module.exports = router;