//Importamos librerias y modulos
const md5 = require('md5');
const UsuarioRepository = require('../modules/usuario.repository.js');
const MaestroRepository = require('../modules/maestro.repository.js');
const { MaestroAdd, UsuarioMaestroAdd } = require('../models/maestro.model.js');
const { UsuarioAdd } = require('../models/usuario.model.js');
  

//Cramos objeto controllador
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

module.exports = maestroCtrl;