//Importamos librerias
const pool = require("../providers/postgres-db");

//Creamos nuevo objeto repository
const MaestroRepository = {}

MaestroRepository.addMaestro = async(maestro) => {
    try{
        //Creamos query de insert
        const text = `
            INSERT INTO maestros (usuario_id, nombre, apellido_paterno, apellido_materno, escolaridad, coordinador, carrera, status, created_at, updated_at )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING maestro_id
        `;
        //Indicamos parámetros del query
        const values = [maestro.usuario_id, maestro.nombre, maestro.apellido_paterno, maestro.apellido_materno, 
            maestro.escolaridad, maestro.coordinador, maestro.carrera, 1, new Date(), new Date()];

        //Ejecutamos query y esperamos respuesta
        var res = await pool.query(text, values);

        //Evaluamos respuesta, si no hay información lanzamos error 
        if(res == null || res.rowCount === 0) throw new Error('Registro no creado.');
        
        return { success: true, payload: res.rows[0].maestro_id };
    }catch(e){
        //Lanzamos error
        throw new Error(e.message);
    }
}

module.exports = MaestroRepository;