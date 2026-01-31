//Clase para envio de datos -> maestro editar
export class MaestroFormEditar {
    //Construcctor de la clase
    constructor(maestro_id: number, nombre:string, apellido_paterno:string, apellido_materno:string,
        escolaridad:number, coordinador:string, carrera:number
    ){
        this.maestro_id = maestro_id;
        this.nombre = nombre;
        this.apellido_paterno = apellido_paterno;
        this.apellido_materno = apellido_materno;
        this.escolaridad = escolaridad;
        this.coordinador = coordinador;
        this.carrera = carrera;
    }
    maestro_id: number;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    escolaridad: number;
    coordinador: string;
    carrera: number;
}

//Clase para envio de datos -> maestro editar
export class MaestroFormEditarStatus {
    //Construcctor de la clase
    constructor(maestro_id: number, status:number
    ){
        this.maestro_id = maestro_id;
        this.status = status;
    }
    maestro_id: number;
    status: number;
}