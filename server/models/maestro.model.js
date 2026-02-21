class Maestro{
    maestro_id;
    usuario_id;
    nombre;
    apellido_paterno;
    apellido_materno;
    escolaridad;
    coordinador;
    carrera;
    status;
    created_at;
    updated_at;
    deleted_at;
}

class UsuarioMaestroAdd {
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

class MaestroAdd {
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

class MaestroUpdate {
  constructor(maestro) {
    this.maestro_id = Number(maestro.maestro_id);
    this.nombre = maestro.nombre;
    this.apellido_paterno = maestro.apellido_paterno;
    this.apellido_materno = maestro.apellido_materno;
    this.escolaridad = maestro.escolaridad;
    this.coordinador = maestro.coordinador;
    this.carrera = maestro.carrera;
  }
}

class MaestroUpdateStatus {
  constructor(maestro) {
    this.maestro_id = maestro.maestro_id;
    this.status = Number(maestro.status) == 1 ? 1 : 2;
  }
}

module.exports = { Maestro, UsuarioMaestroAdd, MaestroAdd, MaestroUpdate, MaestroUpdateStatus };
