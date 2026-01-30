//Importamos librerias y modulos
const md5 = require('md5');
const UsuarioRepository = require('../modules/usuario.repository.js');
const MaestroRepository = require('../modules/maestro.repository.js');
const { MaestroAdd, MaestroUpdate, MaestroUpdateStatus } = require('../models/maestro.model.js');
const { UsuarioAdd } = require('../models/usuario.model.js');

//Cramos objeto controllador: se define dentro de los corchetes como un ojeto vacío.
const maestroCtrl = {};

//Definimos una función dentro del objeto controllador
//async = ejecutará promesas, por lo que debemos esperar respuestas
//req = la petición http, incluye heaaders(token de acceso) y body(formulario)
//res.status().send() = regresamos respuesta al cliente un objeto en formato JSON
//success = true/false, si se complete de forma exitosa
//payload = respuesta del repositorio, puede ser un id, una lista de elementos, un objeto, etc.
maestroCtrl.agregar = async (req, res) => {
    try{
        // Validate request
        if (!req.body) return res.status(400).send({ success: false, error: "Sin contenido en la petición" });
        
        // Obtenemos valores del body
        let usuario = new UsuarioAdd(req.body, 3);
        usuario.password = md5(usuario.password.toString());

        //Creamos el usuario en la BD
        var rUsuario = await UsuarioRepository.addUsuario(usuario);

        //Si tenemos respuesta positiva creamos el maestro
        if(rUsuario.success){
            //Creamos el maestro en la BD
            let maestro = new MaestroAdd(req.body, rUsuario.payload);
            var rMaestro = await MaestroRepository.addMaestro(maestro);

            //Validamos respuesta
            if(rMaestro.success){
                return res.status(200).send({ success: true, payload: rMaestro.payload });
            }else{
                return res.status(400).send({ success: false, error: "Usuario no creado" });
            }

        } else return res.status(400).send({ success: false, error: "Usuario no creado" });
        
    }
    catch(e){
        //Si ocurre un error lo mostramos en terminal y regresamos error 400
        console.log(e);
        return res.status(400).send({ success: false, error: e.message});
    }
}

//Función para editar
maestroCtrl.editar = async (req, res) => {
    try{
        // Validate request
        if (!req.body) return res.status(400).send({ success: false, error: "Sin contenido en la petición" });
        
        // Obtenemos valores del body
        let maestro = new MaestroUpdate(req.body);

        //Actualizamos el registro en la BD
        var rMaestro = await MaestroRepository.updateMaestro(maestro);

        //Validamos respuesta
        if(rMaestro.success){
            return res.status(200).send({ success: true, payload: rMaestro.payload });
        }else{
            return res.status(400).send({ success: false, error: "Maestro no actualizado" });
        }
        
    }
    catch(e){
        //Si ocurre un error lo mostramos en terminal y regresamos error 400
        console.log(e);
        return res.status(400).send({ success: false, error: e.message});
    }
}

//Función para editar status
maestroCtrl.editarStatus = async (req, res) => {
    try{
        // Validate request
        if (!req.body) return res.status(400).send({ success: false, error: "Sin contenido en la petición" });

        // Obtenemos valores del body
        let maestro = new MaestroUpdateStatus(req.body);

        //Actualizamos el registro en la BD
        var rMaestro = await MaestroRepository.updateStatusMaestro(maestro);

        //Validamos respuesta
        if(rMaestro.success){
            return res.status(200).send({ success: true, payload: rMaestro.payload });
        }else{
            return res.status(400).send({ success: false, error: "Maestro no actualizado" });
        }
        
    }
    catch(e){
        //Si ocurre un error lo mostramos en terminal y regresamos error 400
        console.log(e);
        return res.status(400).send({ success: false, error: e.message});
    }
}

//Función para eliminar
maestroCtrl.eliminar = async (req, res) => {
    try{
        // Validate request
        if (!req.body) return res.status(400).send({ success: false, error: "Sin contenido en la petición" });
        
        // Obtenemos valores
        var maestro_id = req.params.id;

        //Actualizamos el registro en la BD
        var rMaestro = await MaestroRepository.deleteMaestro(maestro_id);

        //Validamos respuesta
        if(rMaestro.success){
            return res.status(200).send({ success: true, payload: rMaestro.payload });
        }else{
            return res.status(400).send({ success: false, error: "Maestro no eliminado" });
        }
        
    }
    catch(e){
        //Si ocurre un error lo mostramos en terminal y regresamos error 400
        console.log(e);
        return res.status(400).send({ success: false, error: e.message});
    }
}

//Función para obtener
maestroCtrl.obtener = async (req, res) => {
    try{
        // Validate request
        if (!req.body) return res.status(400).send({ success: false, error: "Sin contenido en la petición" });
        
        // Obtenemos valores
        var maestro_id = req.params.id;

        //Actualizamos el registro en la BD
        var rMaestro = await MaestroRepository.getMaestro(maestro_id);

        //Validamos respuesta
        if(rMaestro.success){
            return res.status(200).send({ success: true, payload: rMaestro.payload });
        }else{
            return res.status(400).send({ success: false, error: "Maestro no eliminado" });
        }
        
    }
    catch(e){
        //Si ocurre un error lo mostramos en terminal y regresamos error 400
        console.log(e);
        return res.status(400).send({ success: false, error: e.message});
    }
}

//Función para buscar masestros
maestroCtrl.buscar = async(req, res) => {
    try{
        
        //Obtenemos valores del url para usarlos en la busqueda
        var palabra = req.query.palabra;
        var ordenBy = req.query.ordenBy;
        var orden = req.query.orden; 
        var pagina = Number(req.query.pagina);

        //Buscamos datos
        var rList = await MaestroRepository.searchMaestro(palabra, ordenBy, orden, 2, pagina);
        if(rList.success){
            //Regresamos resulado 
            return res.status(200).send(rList);
        }else return res.status(400).send({ success: false, error: "Maestro(s) no encontrado" });
    }
    catch(e){
        //Si ocurre un error lo mostramos en terminal y regresamos error 400
        console.log(e);
        return res.status(400).send({ success: false, error: e.message});
    }
}

module.exports = maestroCtrl;