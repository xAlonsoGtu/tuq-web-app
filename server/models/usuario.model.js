class Usuario {
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

class UsuarioAdd {
  constructor(newUser, tipo_usuario) {
    this.username = newUser.username;
    this.password = newUser.password;
    this.tipo_usuario = tipo_usuario;
  }
}

module.exports = { UsuarioAdd, Usuario };