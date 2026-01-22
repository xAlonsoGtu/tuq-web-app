//Importamos librerias y modulos
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const UsuarioRepository = require('../modules/usuario.repository.js');

//Cramos objeto controllador
const authCtrl = {};

//Definimos una función dentro del objeto controllador
//async = ejecutará promesas, por lo que debemos esperar respuestas
//req = la petición http, incluye heaaders(token de acceso) y body(formulario)
//res.status().send() = regresamos respuesta al cliente un objeto en formato JSON
//success = true/false, si se complete de forma exitosa
//payload = respuesta del repositorio, puede ser un id, una lista de elementos, un objeto, etc.
authCtrl.login = async (req, res) => {
	try{
        // Validate request
        if (!req.body) return res.status(400).send({ success: false, error: "Sin contenido en la petición" });

        // Obtenemos valores del body
        let { user, pass } = req.body;

        // Transformamos el password para validarlo en la BD
        var hashed_password = md5(pass.toString());

        // Usamos el repositorio para buscar el usuario con contraseña
        var rUsuario = await UsuarioRepository.getAuthUsuario(user,hashed_password);

        // Validamos respuesta
        if(rUsuario.success){
            // Creamos token
            let token = jwt.sign({ data: rUsuario.payload }, 'secret!');
            return res.status(200).send({ success: true, payload: token });
            //res.status(200).send({ success: true, payload: sss.payload });
        }else{
            return res.status(400).send({ success: false, error: "Usuario incorrecto." });
        }
        
    }
    catch(e){
        //Si ocurre un error lo mostramos en terminal y regresamos error 400
        console.log(e);
        return res.status(400).send({ success: false, error: e.message});
    }
}

module.exports = authCtrl;
