//Clase para envio de datos -> maestro agregar
export class MaestroForm {
    //Construcctor de la clase
    constructor(username:string, password:string, nombre:string, apellido_paterno:string, apellido_materno:string,
        escolaridad:number, coordinador:string, carrera:number
    ){
        this.username = username;
        this.password = password;
        this.nombre = nombre;
        this.apellido_paterno = apellido_paterno;
        this.apellido_materno = apellido_materno;
        this.escolaridad = escolaridad;
        this.coordinador = coordinador;
        this.carrera = carrera;
    }
    username: string;
    password: string;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    escolaridad: number;
    coordinador: string;
    carrera: number;
}