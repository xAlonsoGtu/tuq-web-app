//Importamos librerias
const pool = require("../providers/postgres-db");

//Creamos nuevo objeto repository
const UsuarioRepository = {}

//Agregamos nueva funcion async(espera promesa) al repository con 1 parámetro
UsuarioRepository.getAuthUsuario = async(username, password) => {
    try{
        //Creamos query de consulta
        const text = `
            SELECT usuario_id as id, username as user, tipo_usuario as tipo, imagen_perfil as img, qr_code as qr 
            FROM usuarios 
            WHERE username = $1 and password = $2 and status != 4
        `;
        //Indicamos parámetros del query
        const values = [username, password];

        //Ejecutamos query y esperamos respuesta
        var res = await pool.query(text, values);

        //Evaluamos respuesta, si no hay información lanzamos error 
        if(res == null || res.rowCount === 0) throw new Error('Usuario o contraseña incorrecto.');
        
        //Si hay respuesta devolvemos objeto (ResponseApi)
        return { success: true, payload: res.rows[0] };
    }catch(e){
        //Lanzamos error
        throw new Error(e.message);
    }
}

//Agregamos nueva funcion async(espera promesa) al repository con 1 parámetro
UsuarioRepository.addUsuario = async (usuario) => {
    try{
        //Creamos query de insert
        const text = `
            INSERT INTO usuarios (username, password, tipo_usuario, status, created_at, updated_at )
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING usuario_id
        `;
        //Indicamos parámetros del query
        const values = [usuario.username, usuario.password, usuario.tipo_usuario, 1, new Date(), new Date()];

        //Ejecutamos query y esperamos respuesta
        var res = await pool.query(text, values);

        //Evaluamos respuesta, si no hay información lanzamos error 
        if(res == null || res.rowCount === 0) throw new Error('Registro no creado.');
        
        return { success: true, payload: res.rows[0].usuario_id };
    }catch(e){
        //Lanzamos error
        throw new Error(e.message);
    }
};


module.exports = UsuarioRepository;