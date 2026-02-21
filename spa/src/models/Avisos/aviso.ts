//Clase para representar un Aviso completo
export class Aviso {
    aviso_id: number;
    nombre: string;
    descripcion: string;
    imagen_url: string;
    fecha_inicio: Date;
    status: number;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;

    constructor(aviso: any) {
        this.aviso_id = aviso.aviso_id;
        this.nombre = aviso.nombre;
        this.descripcion = aviso.descripcion;
        this.imagen_url = aviso.imagen_url;
        this.fecha_inicio = aviso.fecha_inicio;
        this.status = aviso.status;
        this.created_at = aviso.created_at;
        this.updated_at = aviso.updated_at;
        this.deleted_at = aviso.deleted_at;
    }
}

