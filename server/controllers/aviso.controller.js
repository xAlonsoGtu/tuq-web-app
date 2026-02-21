//Importamos librerías y módulos
const AvisoRepository = require('../modules/aviso.repository.js');
const { AvisosAdd, AvisosUpdate, AvisosUpdateStatus } = require('../models/avisos.model.js');

//Creamos objeto controlador
const avisoCtrl = {};

//Constantes
const MAX_LIMITS_LIST = 3;

//Función para agregar un aviso
avisoCtrl.agregar = async (req, res) => {
    try {
        if (!req.body) return res.status(400).send({ success: false, error: "Sin contenido en la petición" });

        // Obtenemos valores del body
        let aviso = new AvisosAdd(req.body);

        //Creamos el aviso en la BD
        var rAviso = await AvisoRepository.addAviso(aviso);

        if (rAviso.success) {
            return res.status(200).send({ success: true, payload: rAviso.payload });
        } else {
            return res.status(400).send({ success: false, error: "Aviso no creado" });
        }
    } catch (e) {
        console.log(e);
        return res.status(400).send({ success: false, error: e.message });
    }
}

//Función para editar aviso
avisoCtrl.editar = async (req, res) => {
    try {
        if (!req.body) return res.status(400).send({ success: false, error: "Sin contenido en la petición" });

        let aviso = new AvisosUpdate(req.body);

        var rAviso = await AvisoRepository.updateAviso(aviso);

        if (rAviso.success) {
            return res.status(200).send({ success: true, payload: rAviso.payload });
        } else {
            return res.status(400).send({ success: false, error: "Aviso no actualizado" });
        }
    } catch (e) {
        console.log(e);
        return res.status(400).send({ success: false, error: e.message });
    }
}

//Función para editar status
avisoCtrl.editarStatus = async (req, res) => {
    try {
        if (!req.body) return res.status(400).send({ success: false, error: "Sin contenido en la petición" });

        let aviso = new AvisosUpdateStatus(req.body);

        var rAviso = await AvisoRepository.updateStatusAviso(aviso);

        if (rAviso.success) {
            return res.status(200).send({ success: true, payload: rAviso.payload });
        } else {
            return res.status(400).send({ success: false, error: "Aviso no actualizado" });
        }
    } catch (e) {
        console.log(e);
        return res.status(400).send({ success: false, error: e.message });
    }
}

//Función para eliminar aviso
avisoCtrl.eliminar = async (req, res) => {
    try {
        if (!req.params.id) return res.status(400).send({ success: false, error: "Sin contenido en la petición" });

        var aviso_id = req.params.id;

        var rAviso = await AvisoRepository.deleteAviso(aviso_id);

        if (rAviso.success) {
            return res.status(200).send({ success: true, payload: rAviso.payload });
        } else {
            return res.status(400).send({ success: false, error: "Aviso no eliminado" });
        }
    } catch (e) {
        console.log(e);
        return res.status(400).send({ success: false, error: e.message });
    }
}

//Función para obtener aviso por ID
avisoCtrl.obtener = async (req, res) => {
    try {
        if (!req.params.id) return res.status(400).send({ success: false, error: "Sin contenido en la petición" });

        var aviso_id = req.params.id;

        var rAviso = await AvisoRepository.getAviso(aviso_id);

        if (rAviso.success) {
            return res.status(200).send({ success: true, payload: rAviso.payload });
        } else {
            return res.status(400).send({ success: false, error: "Aviso no encontrado" });
        }
    } catch (e) {
        console.log(e);
        return res.status(400).send({ success: false, error: e.message });
    }
}

//Función para buscar avisos
avisoCtrl.buscar = async (req, res) => {
    try {
        var palabra = req.query.palabra;
        var ordenBy = req.query.ordenBy;
        var orden = req.query.orden;
        var pagina = Number(req.query.pagina);

        var rList = await AvisoRepository.searchAviso(palabra, ordenBy, orden, MAX_LIMITS_LIST, pagina);

        if (rList.success) {
            return res.status(200).send(rList);
        } else {
            return res.status(400).send({ success: false, error: "Aviso(s) no encontrado" });
        }
    } catch (e) {
        console.log(e);
        return res.status(400).send({ success: false, error: e.message });
    }
}

module.exports = avisoCtrl;
