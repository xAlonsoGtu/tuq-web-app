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

AlumnoRepository.searchAlumno = async(palabra, ordenBy, orden, limite, pagina) => {
    try{
        //Creamos query de insert
        const palabra_like = "%" + palabra + "%"; //Buscamos por palabras que contengan...
        const offset = limite * pagina; //Calculamos offset, apartir de cuál registro buscar
        const orderBy = "ORDER BY " + ordenBy + (orden == "desc" ? " DESC" : " ASC"); //Ordenamiento
        const where = palabra != null && palabra != "" ? "WHERE username LIKE $3 OR nombre LIKE $3 OR apellido_materno LIKE $3" : ""; //Si hay palabra que buscar
        const text = `
            SELECT alumnos.alumno_id, alumnos.usuario_id, alumnos.nombre, alumnos.apellido_paterno, alumnos.apellido_materno, 
                    alumnos.carrera, alumnos.status, alumnos.tipo_estudio, alumnos.cuatrimestre
            FROM alumnos
            LEFT JOIN usuarios ON alumnos.usuario_id = usuarios.usuario_id
            ${where}
            ${orderBy}
            LIMIT $1 OFFSET $2
        `;
        const values = where != "" ? [limite, offset, palabra_like] : [limite, offset];

        //Ejecutamos query y esperamos respuesta
        var res = await pool.query(text, values);

        //Evaluamos respuesta, si no hay información lanzamos error 
        if(res == null || res.rowCount === 0) throw new Error('No se encontró información.');

        //Obtenemos paginator
        var paginator = null;
        var rPaginator = await AlumnoRepository.searchAlumnoPaginator(palabra, limite, pagina);
        if(rPaginator.success) paginator = rPaginator.payload;
        
        //Devolvemos resultados
        return { success: true, payload: res.rows, paginator: paginator };
    }catch(e){
        //Lanzamos error
        throw new Error(e.message);
    }
}

AlumnoRepository.searchAlumnoPaginator = async( palabra, limite, pagina) => {
    try{
        //Creamos query de insert
        const palabra_like = "%" + palabra + "%"; //Buscamos por palabras que contengan...
        const where = palabra != null && palabra != "" ? "WHERE username LIKE $1 OR nombre LIKE $1 OR apellido_materno LIKE $1" : "";
        const text = `
            SELECT count(alumno_id) as filas
            FROM alumnos
            LEFT JOIN usuarios ON alumnos.usuario_id = usuarios.usuario_id
            ${where}
        `;
        const values = where != "" ? [palabra_like] : [];

        //Ejecutamos query y esperamos respuesta
        var res = await pool.query(text, values);

        //Evaluamos respuesta, si no hay información lanzamos error 
        if(res == null || res.rowCount === 0) throw new Error('No se encontró información.');

        //Armamos objeto paginator
        const restantes = (res.rows[0].filas % limite);
        const num_pages = Math.floor(res.rows[0].filas / limite) + (restantes > 0 ? 1 : 0);
        const paginator = {
            pageSize: limite,
            pageIndex: pagina,
            total: res.rows[0].filas,
            pages: num_pages
        }
        
        return { success: true, payload: paginator };
    }catch(e){
        //Lanzamos error
        throw new Error(e.message);
    }
}

module.exports = AlumnoRepository;