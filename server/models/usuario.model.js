<<<<<<< HEAD
module.exports= class Usuario {
=======
<<<<<<< HEAD
module.exports = class Usuario {
=======
class Usuario {
>>>>>>> 2ada4b773214607cf99115220c89b75690ec6352
>>>>>>> e29ecee32b6fde3235f20248334eea1e6aa95796
  constructor(){
  }
  usuario_id;
  username;
  password;
  tipo_usuario;
  correo_secundario;
  telefono;
  imagen_perfil;
  qr_code;
  status;
  created_at;
  updated_at;
  deleted_at;
}

<<<<<<< HEAD
module.exports= class UsuarioAdd {
=======
<<<<<<< HEAD
module.exports = class UsuarioAdd {
=======
class UsuarioAdd {
>>>>>>> 2ada4b773214607cf99115220c89b75690ec6352
>>>>>>> e29ecee32b6fde3235f20248334eea1e6aa95796
  constructor(newUser, tipo_usuario) {
    this.username = newUser.username;
    this.password = newUser.password;
    this.tipo_usuario = tipo_usuario;
  }
}

module.exports = { UsuarioAdd, Usuario };