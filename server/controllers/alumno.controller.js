
const md5 = require('md5');
const UsuarioRepository = require('../modules/usuario.repository.js');
const AlumnoRepository = require('../modules/alumnos.repository.js');
const { AlumnoAdd, UsuarioAlumnoAdd } = require('../models/alumno.model.js');
const { UsuarioAdd } = require('../models/usuario.model.js');
  
const alumnoCtrl = {};

alumnoCtrl.agregar = async (req, res) => {
    try{
       
        if (!req.body) return res.status(400).send({ success: false, error: "Sin contenido en la petición" });
          
        let usuario = new UsuarioAdd(req.body, 3);
        usuario.password = md5(usuario.password.toString());

        
        var rUsuario = await UsuarioRepository.addUsuario(usuario);

        if(rUsuario.success){
            
            let alumno = new AlumnoAdd(req.body, rUsuario.payload);
            var rAlumno = await AlumnoRepository.addAlumno(alumno);

           
            if(rAlumno.success){
                return res.status(200).send({ success: true, payload: rAlumno.payload });
            }else{
                return res.status(400).send({ success: false, error: "Alumno no creado" });
            }

        } else return res.status(400).send({ success: false, error: "Alumno no creado" });
        
    }
    catch(e){
        
        console.log(e);
        return res.status(400).send({ success: false, error: e.message});
    }
}

module.exports = alumnoCtrl;