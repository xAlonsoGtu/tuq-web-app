 //Importamos librerías
const express = require('express');
const router = express.Router();

//Importamos controlador
const avisoController = require("../controllers/aviso.controller");
const { verifyTokenAdmin } = require('../middleware/auth');

//Indicamos rutas
//Si la ruta es POST con la URL /agregar, entonces ejecutamos el método 'agregar' del controlador
router.post('/agregar', verifyTokenAdmin, avisoController.agregar);


//Rutas con PUT
router.put('/editar', verifyTokenAdmin, avisoController.editar);
router.put('/status', verifyTokenAdmin, avisoController.editarStatus);

//Ruta con DELETE
router.delete('/eliminar/:id', verifyTokenAdmin, avisoController.eliminar);

//Rutas con GET
router.get('/buscar', verifyTokenAdmin, avisoController.buscar);
router.get('/:id', verifyTokenAdmin, avisoController.obtener);

//Exportamos las nuevas rutas creadas para que puedan ser usadas por index.routes
module.exports = router;
