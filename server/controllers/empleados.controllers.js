const md5 = require('md5');
const UsuarioRepository = require('../modules/usuario.repository.js');
const empleadosRepository = require('../modules/empleados.repository.js');
const { empleadosAdd, UsuarioempleadosAdd } = require('../models/emmpleados.model.js');
const { UsuarioAdd } = require('../models/usuario.model.js');
  
const empleadosCtrl = {};

empleadosCtrl.agregar = async (req, res) => {
    try{
       
        if (!req.body) return res.status(400).send({ success: false, error: "Sin contenido en la petición" });
          
        let usuario = new UsuarioAdd(req.body, 3);
        usuario.password = md5(usuario.password.toString());

        
        var rUsuario = await UsuarioRepository.addUsuario(usuario);

        if(rUsuario.success){
            
            let empleados = new empleadosAdd(req.body, rUsuario.payload);
            var empleados = await empleadosRepository.addempleados(empleados);

           
            if(empleados.success){
                return res.status(200).send({ success: true, payload: empleados.payload });
            }else{
                return res.status(400).send({ success: false, error: "empleados no creado" });
            }

        } else return res.status(400).send({ success: false, error: "empleados no creado" });
        
    }
    catch(e){
        
        console.log(e);
        return res.status(400).send({ success: false, error: e.message});
    }
}

module.exports = empleadosCtrl;