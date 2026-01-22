export class Maestro{
    maestro_id;
    usuario_id;
    nombre;
    apellido_paterno;
    apellido_materno;
    escolaridad;
    coordinador;
    carrera;
}

export class UsuarioMaestroAdd {
  constructor(nUsuario) {
    this.username = nUsuario.username;
    this.password = nUsuario.password;
    this.nombre = nUsuario.nombre;
    this.apellido_paterno = nUsuario.apellido_paterno;
    this.apellido_materno = nUsuario.apellido_materno;
    this.escolaridad = nUsuario.escolaridad;
    this.coordinador = nUsuario.coordinador;
    this.carrera = nUsuario.carrera;
  }
}

export class MaestroAdd {
  constructor(nUsuario, usuario_id) {
    this.usuario_id = usuario_id;
    this.nombre = nUsuario.nombre;
    this.apellido_paterno = nUsuario.apellido_paterno;
    this.apellido_materno = nUsuario.apellido_materno;
    this.escolaridad = nUsuario.escolaridad;
    this.coordinador = nUsuario.coordinador;
    this.carrera = nUsuario.carrera;
  }
}

export default {MaestroAdd, UsuarioMaestroAdd};
