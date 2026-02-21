//Clase para envío de datos -> aviso agregar
export class AvisoForm {
    constructor(
        nombre: string,
        descripcion: string,
        imagen_url: string,
        fecha_inicio: Date,
        status: number
    ) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagen_url = imagen_url;
        this.fecha_inicio = fecha_inicio;
        this.status = status;
    }

    nombre: string;
    descripcion: string;
    imagen_url: string;
    fecha_inicio: Date;
    status: number;
}
