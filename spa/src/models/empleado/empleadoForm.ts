// Clase para envío de datos -> empleado agregar
export class EmpleadoForm {
    // Constructor de la clase
    constructor(
        nombre: string,
        apellido_paterno: string,
        apellido_materno: string,
        area: string,
        puesto: string,
        is_coordinador: boolean,
        usuario_id: number
    ) {
        this.nombre = nombre;
        this.apellido_paterno = apellido_paterno;
        this.apellido_materno = apellido_materno;
        this.area = area;
        this.puesto = puesto;
        this.is_coordinador = is_coordinador;
        this.usuario_id = usuario_id;
    }

    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    area: string;
    puesto: string;
    is_coordinador: boolean;
    usuario_id: number;
}