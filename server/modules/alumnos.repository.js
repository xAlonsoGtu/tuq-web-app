//Importamos librerias
const pool = require("../providers/postgres-db");

//Creamos nuevo objeto repository
const AlumnoRepository = {}

AlumnoRepository.addAlumno = async(alumno) => {
    try{
        //Creamos query de insert
        const text = `
            INSERT INTO alumnos (nombre, apellido_paterno, apellido_materno, tipo_estudio, carrera, cuatrimestre, is_graduado, 
            status, usuario_id, created_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING alumno_id
        `;
        //Indicamos parámetros del query
        const values = [alumno.nombre, alumno.apellido_paterno, alumno.apellido_materno, alumno.tipo_estudio, 
            alumno.carrera, alumno.cuatrimestre, alumno.graduado, 1, alumno.usuario_id, new Date()];

        //Ejecutamos query y esperamos respuesta
        var res = await pool.query(text, values);

        //Evaluamos respuesta, si no hay información lanzamos error 
        if(res == null || res.rowCount === 0) throw new Error('Registro no creado.');
        
        return { success: true, payload: res.rows[0].alumno_id };
    }catch(e){
        //Lanzamos error
        throw new Error(e.message);
    }
}

module.exports = AlumnoRepository;