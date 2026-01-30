//Importamos librerias
const Pool = require('pg').Pool;

//Importamos configuración db
const config = require("../config/db.config");

//Creamos nuevo conexión tipo pool con los datos de configuración
const pool = new Pool(config);

//Mensaje de error cuando se detecta algún error en el pool de conexión
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
});

//Exportamos conexión para ser usada por los repositorios
module.exports = pool;


//
// INNER JOIN: Returns records that have matching values in both tables
// LEFT JOIN: Returns all records from the left table, and the matched records from the right table
// RIGHT JOIN: Returns all records from the right table, and the matched records from the left table
// FULL JOIN: Returns all records when there is a match in either left or right table
// CROSS JOIN: Returns the Cartesian product of two or more tables (combines every row from the first table with every row from the second table)

//Otra opción para manejar conexiones
// query = async (text, params) => {
//   const start = Date.now()
//   const res = await pool.query(text, params)
//   const duration = Date.now() - start
//   console.log('executed query', { text, duration, rows: res.rowCount })
//   return res
// }
// module.exports = query;

// pool - permite generar queries de forma frecuente sin tener que estar conectándonos una y otra vez a la BD. Ejecuciones en parelelo.
// Limitaciones conexión cliente (SIN POOL):
// Conectar un nuevo cliente al servidor PostgreSQL requiere un protocolo de enlace que puede tardar entre 20 y 30 milisegundos. 
// Durante este tiempo, se negocian las contraseñas, se puede establecer SSL y se comparte la información de configuración con el cliente y el servidor. 
// Incurrir en este costo cada vez que se ejecuta una consulta ralentizaría considerablemente la aplicación.
// El servidor PostgreSQL solo puede manejar una cantidad limitada de clientes a la vez.
// PostgreSQL solo puede procesar una consulta a la vez en un solo cliente conectado, siguiendo el principio de "primero en entrar, primero en salir". 
// Si su aplicación web utiliza un solo cliente conectado, todas las consultas dse ejecutarán en serie, una tras otra.


////Transaction acid BEGIN CALLBACK END
// try {
//   await client.query('BEGIN')
//   const queryText = 'INSERT INTO users(name) VALUES($1) RETURNING id'
//   const res = await client.query(queryText, ['brianc'])
 
//   const insertPhotoText = 'INSERT INTO photos(user_id, photo_url) VALUES ($1, $2)'
//   const insertPhotoValues = [res.rows[0].id, 's3.bucket.foo']
//   await client.query(insertPhotoText, insertPhotoValues)
//   await client.query('COMMIT')
// } catch (e) {
//   await client.query('ROLLBACK')
//   throw e
// } finally {
//   client.release()
// }

////Una sola consulta, solo libera recursos
// const result = await pool.query('SELECT $1::text as name', ['brianc'])
// console.log(result.rows[0].name) // brianc

////Multiples consultas
// const client = await pool.connect()
// await client.query('SELECT NOW()')
// client.release()
    