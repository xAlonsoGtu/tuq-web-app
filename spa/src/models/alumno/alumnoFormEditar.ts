//Clase para envio de datos -> maestro editar
export class AlumnoFormEditar {
    //Construcctor de la clase
    constructor(alumno_id: number, nombre:string, apellido_paterno:string, apellido_materno:string,
        tipo_estudio:string, cuatrimestre:number, carrera:string
    ){
        this.alumno_id = alumno_id;
        this.nombre = nombre;
        this.apellido_paterno = apellido_paterno;
        this.apellido_materno = apellido_materno;
        this.tipo_estudio = tipo_estudio;
        this.cuatrimestre = cuatrimestre;
        this.carrera = carrera;
    }
    alumno_id: number;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    tipo_estudio: string;
    cuatrimestre: number;
    carrera: string;
}

//Clase para envio de datos -> maestro editar
export class AlumnoFormEditarStatus {
    //Construcctor de la clase
    constructor(alumno_id: number, status:number
    ){
        this.alumno_id = alumno_id;
        this.status = status;
    }
    alumno_id: number;
    status: number;
}