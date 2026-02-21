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

MaestroRepository.updateMaestro = async(maestro) => {
    try{
        //Creamos query de update
        const text = `
            UPDATE maestros
            SET nombre=$2, apellido_paterno=$3, apellido_materno=$4, escolaridad=$5, carrera=$6, coordinador=$7, updated_at=$8
            WHERE maestro_id = $1
        `;
        //Indicamos parámetros del query
        const values = [maestro.maestro_id, maestro.nombre, maestro.apellido_paterno, maestro.apellido_materno, 
            maestro.escolaridad, maestro.carrera, maestro.coordinador, new Date()];

        //Ejecutamos query y esperamos respuesta
        var res = await pool.query(text, values);

        //Evaluamos respuesta, si no hay información lanzamos error 
        if(res == null || res.rowCount === 0) throw new Error('Registro no creado.');
        
        return { success: true, payload: res.rows[0] };
    }catch(e){
        //Lanzamos error
        throw new Error(e.message);
    }
}

MaestroRepository.updateStatusMaestro = async(maestro) => {
    try{
        //Creamos query de update
        const text = `
            UPDATE maestros
            SET status = $2
            WHERE maestro_id = $1
        `;
        //Indicamos parámetros del query
        const values = [maestro.maestro_id, maestro.status];

        //Ejecutamos query y esperamos respuesta
        var res = await pool.query(text, values);
        console.log(res);
        //Evaluamos respuesta, si no hay información lanzamos error 
        if(res == null || res.rowCount === 0) throw new Error('Registro no creado.');
        
        //Retornamos valor
        return { success: true, payload: maestro.maestro_id };
    }catch(e){
        //Lanzamos error
        throw new Error(e.message);
    }
}

MaestroRepository.deleteMaestro = async(maestro_id) => {
    try{
        //Creamos query de update
        const text = `
            UPDATE maestros
            SET status=4, deleted_at = $2
            WHERE maestro_id = $1
        `;
        //Indicamos parámetros del query
        const values = [maestro_id, new Date()];

        //Ejecutamos query y esperamos respuesta
        var res = await pool.query(text, values);
        
        //Evaluamos respuesta, si no hay información lanzamos error 
        if(res == null || res.rowCount === 0) throw new Error('Registro no creado.');
        
        return { success: true, payload: maestro_id };
    }catch(e){
        //Lanzamos error
        throw new Error(e.message);
    }
}

MaestroRepository.getMaestro = async(maestro_id) => {
    try{
        //Creamos query de busqueda
        const text = `
            SELECT maestros.maestro_id, maestros.usuario_id, maestros.nombre, maestros.apellido_paterno, maestros.apellido_materno, 
                    maestros.carrera, maestros.coordinador, maestros.escolaridad, maestros.status, maestros.created_at, 
                    usuarios.username, usuarios.imagen_perfil, usuarios.qr_code 
            FROM maestros
            LEFT JOIN usuarios ON maestros.usuario_id = usuarios.usuario_id        
            WHERE maestro_id = $1
            LIMIT 1
        `;
        const values = [maestro_id];

        //Ejecutamos query y esperamos respuesta
        var res = await pool.query(text, values);

        //Evaluamos respuesta, si no hay información lanzamos error 
        if(res == null || res.rowCount === 0) throw new Error('No se encontró información.');
        
        //Devolvemos resultados
        return { success: true, payload: res.rows[0] };
    }catch(e){
        //Lanzamos error
        throw new Error(e.message);
    }
}

MaestroRepository.searchMaestro = async(palabra, ordenBy, orden, limite, pagina) => {
    try{
        //Creamos query de insert
        const palabra_like = "%" + palabra + "%"; //Buscamos por palabras que contengan...
        const offset = limite * pagina; //Calculamos offset, apartir de cuál registro buscar
        const orderBy = "ORDER BY " + ordenBy + (orden == "desc" ? " DESC" : " ASC"); //Ordenamiento
        const where = palabra != null && palabra != "" ? "WHERE username LIKE $3 OR nombre LIKE $3 OR apellido_materno LIKE $3" : ""; //Si hay palabra que buscar
        const text = `
            SELECT maestros.maestro_id, maestros.usuario_id, maestros.nombre, maestros.apellido_paterno, maestros.apellido_materno, 
                    maestros.carrera, maestros.coordinador, maestros.status, maestros.created_at, 
                    usuarios.username, usuarios.imagen_perfil, usuarios.qr_code 
            FROM maestros
            LEFT JOIN usuarios ON maestros.usuario_id = usuarios.usuario_id
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
        var rPaginator = await MaestroRepository.searchMaestroPaginator(palabra, limite, pagina);
        if(rPaginator.success) paginator = rPaginator.payload;
        
        //Devolvemos resultados
        return { success: true, payload: res.rows, paginator: paginator };
    }catch(e){
        //Lanzamos error
        throw new Error(e.message);
    }
}

MaestroRepository.searchMaestroPaginator = async( palabra, limite, pagina) => {
    try{
        //Creamos query de insert
        const palabra_like = "%" + palabra + "%"; //Buscamos por palabras que contengan...
        const where = palabra != null && palabra != "" ? "WHERE username LIKE $1 OR nombre LIKE $1 OR apellido_materno LIKE $1" : "";
        const text = `
            SELECT count(maestro_id) as filas
            FROM maestros
            LEFT JOIN usuarios ON maestros.usuario_id = usuarios.usuario_id
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

module.exports = MaestroRepository;