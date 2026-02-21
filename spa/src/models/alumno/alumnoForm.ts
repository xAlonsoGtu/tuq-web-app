export class AlumnoForm {
  public username: string;
  public password: string;

  public nombre: string;
  public apellido_paterno: string;
  public apellido_materno: string;

  public tipo_estudio: number | string;
  public carrera: number | string;
  public cuatrimestre: number | string;

  public usuario_id: number;

  constructor(
    username: string,
    password: string,
    nombre: string,
    apellido_paterno: string,
    apellido_materno: string,
    tipo_estudio: number | string,
    carrera: number | string,
    cuatrimestre: number | string,
    usuario_id: number
  ) {
    this.username = username;
    this.password = password;

    this.nombre = nombre;
    this.apellido_paterno = apellido_paterno;
    this.apellido_materno = apellido_materno;

    this.tipo_estudio = tipo_estudio;
    this.carrera = carrera;
    this.cuatrimestre = cuatrimestre;

    this.usuario_id = usuario_id;
  }
}
