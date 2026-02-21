//Importamos librerias
const pool = require("../providers/postgres-db");

//Creamos nuevo objeto repository
const empleadosRepository = {}

empleadosRepository.addempleados = async(empleados) => {
    try{
        //Creamos query de insert
        const text = `
            INSERT INTO empleados (nombre, apellido_paterno, apellido_materno, area, puesto, id_coordinador,status, created_at )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING empleados_id
        `;
        //Indicamos parámetros del query
        const values = [empleados.nombre, empleados.apellido_paterno, empleados.apellido_materno, empleados.area, empleados.puesto, empleados.id_coordinador, 1, new Date()];

        //Ejecutamos query y esperamos respuesta
        var res = await pool.query(text, values);

        //Evaluamos respuesta, si no hay información lanzamos error 
        if(res == null || res.rowCount === 0) throw new Error('Registro no creado.');
        
        return { success: true, payload: res.rows[0].empleados_id };
    }catch(e){
        //Lanzamos error
        throw new Error(e.message);
    }
}

module.exports = empleadosRepository;