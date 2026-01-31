class Alumno {
  constructor(){
  }
  alumno_id;
  nombre;
  apellido_paterno;
  apellido_materno;
  tipo_estudio;
  carrera;
  cuatrimestre;
  is_graduado;
  status;
  created_at;
  updated_at;
  deleted_at;
}

class UsuarioAlumnoAdd {
  constructor(nUsuario) {
    this.username = nUsuario.username;
    this.password = nUsuario.password;
    this.nombre = nUsuario.nombre;
    this.apellido_paterno = nUsuario.apellido_paterno;
    this.apellido_materno = nUsuario.apellido_materno;
    this.carrera = nUsuario.carrera;
    this.cuatrimestre = nUsuario.cuatrimestre;
  }
}

class AlumnoAdd {
  constructor(nUsuario, usuario_id) {
    this.usuario_id = usuario_id;
    this.nombre = nUsuario.nombre;
    this.apellido_paterno = nUsuario.apellido_paterno;
    this.apellido_materno = nUsuario.apellido_materno;
    this.carrera = nUsuario.carrera;
    this.cuatrimestre = nUsuario.cuatrimestre;
  }
}


module.exports = { Alumno, UsuarioAlumnoAdd, AlumnoAdd };