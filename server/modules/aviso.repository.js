 //Importamos librerías
const pool = require("../providers/postgres-db");

//Creamos nuevo objeto repository
const AvisosRepository = {}

//Método para agregar un aviso
AvisosRepository.addAviso = async(aviso) => {
    try {
        //Creamos query de insert
        const text = `
            INSERT INTO avisos (nombre, descripcion, imagen_url, fecha_inicio, status, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING aviso_id
        `;
        //Indicamos parámetros del query
        const values = [
            aviso.nombre,
            aviso.descripcion,
            aviso.imagen_url,
            aviso.fecha_inicio,
            aviso.status || 1, // status por defecto activo
            new Date(),
            new Date()
        ];

        //Ejecutamos query y esperamos respuesta
        const res = await pool.query(text, values);

        //Evaluamos respuesta
        if (res == null || res.rowCount === 0) throw new Error('Aviso no creado.');

        return { success: true, payload: res.rows[0].aviso_id };
    } catch (e) {
        throw new Error(e.message);
    }
}

//Método para actualizar un aviso
AvisosRepository.updateAviso = async(aviso) => {
    try {
        const text = `
            UPDATE avisos
            SET nombre=$2, descripcion=$3, imagen_url=$4, fecha_inicio=$5, status=$6, updated_at=$7
            WHERE aviso_id = $1
        `;
        const values = [
            aviso.aviso_id,
            aviso.nombre,
            aviso.descripcion,
            aviso.imagen_url,
            aviso.fecha_inicio,
            aviso.status,
            new Date()
        ];

        const res = await pool.query(text, values);

        if (res == null || res.rowCount === 0) throw new Error('Aviso no actualizado.');

        return { success: true, payload: aviso.aviso_id };
    } catch (e) {
        throw new Error(e.message);
    }
}

//Método para cambiar status de un aviso
AvisosRepository.updateStatusAviso = async(aviso) => {
    try {
        const text = `
            UPDATE avisos
            SET status=$2
            WHERE aviso_id=$1
        `;
        const values = [aviso.aviso_id, aviso.status];

        const res = await pool.query(text, values);

        if (res == null || res.rowCount === 0) throw new Error('Status no actualizado.');

        return { success: true, payload: aviso.aviso_id };
    } catch (e) {
        throw new Error(e.message);
    }
}

//Método para eliminar (soft delete) un aviso
AvisosRepository.deleteAviso = async(aviso_id) => {
    try {
        const text = `
            UPDATE avisos
            SET status=4, deleted_at=$2
            WHERE aviso_id=$1
        `;
        const values = [aviso_id, new Date()];

        const res = await pool.query(text, values);

        if (res == null || res.rowCount === 0) throw new Error('Aviso no eliminado.');

        return { success: true, payload: aviso_id };
    } catch (e) {
        throw new Error(e.message);
    }
}

//Método para obtener un aviso por ID
AvisosRepository.getAviso = async(aviso_id) => {
    try {
        const text = `
            SELECT aviso_id, nombre, descripcion, imagen_url, fecha_inicio, status, created_at, updated_at, deleted_at
            FROM avisos
            WHERE aviso_id=$1
            LIMIT 1
        `;
        const values = [aviso_id];

        const res = await pool.query(text, values);

        if (res == null || res.rowCount === 0) throw new Error('Aviso no encontrado.');

        return { success: true, payload: res.rows[0] };
    } catch (e) {
        throw new Error(e.message);
    }
}

module.exports = AvisosRepository;
