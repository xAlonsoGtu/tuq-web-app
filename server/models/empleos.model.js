class Empleado {
  empleado_id;
  usuario_id;
  nombre;
  apellido_paterno;
  apellido_materno;
  area;
  puesto;
  is_coordinador;
  status;
  created_at;
  updated_at;
  deleted_at;
}

class EmpleadoAdd {
  constructor(nEmpleado, usuario_id) {
    this.usuario_id = usuario_id;
    this.nombre = nEmpleado.nombre;
    this.apellido_paterno = nEmpleado.apellido_paterno;
    this.apellido_materno = nEmpleado.apellido_materno;
    this.area = nEmpleado.area;
    this.puesto = nEmpleado.puesto;
    this.is_coordinador = nEmpleado.is_coordinador;
  }
}

class EmpleadoUpdate {
  constructor(empleado) {
    this.empleado_id = empleado.empleado_id;
    this.nombre = empleado.nombre;
    this.apellido_paterno = empleado.apellido_paterno;
    this.apellido_materno = empleado.apellido_materno;
    this.area = empleado.area;
    this.puesto = empleado.puesto;
    this.is_coordinador = empleado.is_coordinador;
  }
}

class EmpleadoUpdateStatus {
  constructor(empleado) {
    this.empleado_id = empleado.empleado_id;
    this.status = Number(empleado.status) === 1 ? 1 : 2;
  }
}

module.exports = { Empleado, EmpleadoAdd, EmpleadoUpdate, EmpleadoUpdateStatus };