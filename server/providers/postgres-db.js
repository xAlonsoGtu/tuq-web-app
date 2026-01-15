
require('dotenv').config();
const Pool = require('pg').Pool;

const config = {
    user: "avnadmin",
    password: "AVNS_SmK1QSgkleSzjk4qxAq",
    host: "tuq-tuq-bd.g.aivencloud.com",
    port: 17316,
    database: "tuq_ejemplo",
    ssl: {
        rejectUnauthorized: true,
        ca: `-----BEGIN CERTIFICATE-----
MIIEUDCCArigAwIBAgIULSzPquHNUn6jM0Lj65nrJSotpfQwDQYJKoZIhvcNAQEM
BQAwQDE+MDwGA1UEAww1YTg1MTRhYTgtNjIxMS00ZDcxLThlNGUtYmM3YWM4NmIy
MGRlIEdFTiAxIFByb2plY3QgQ0EwHhcNMjYwMTEzMjA1MDQ3WhcNMzYwMTExMjA1
MDQ3WjBAMT4wPAYDVQQDDDVhODUxNGFhOC02MjExLTRkNzEtOGU0ZS1iYzdhYzg2
YjIwZGUgR0VOIDEgUHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCC
AYoCggGBAPEIf+eWAYbE5nq0YBacg8pUJCsFWhCqi0+bkUjJ+HEQe4pH9BbMhIVV
jBFlY4hIt8ev8Y+QqrrpnGt0z641Ex+H3CiNaHoe7XMO/rXYj0tuo0NgNGS0+0TZ
vb3tB9+ht4hmzPZKUZybtIwN+AZ8tcmAeJlngXEtHUT7VOxOKgQtbiYlN5nmG03d
Fhzm8kMoBx3zwiza0Ujkz0YjmxbRjuv5rcmDrpdNWWNKr+dVpwXbspUgItyckEJj
IwNZW7pj8s3krB0lYcbgXVGUItSf4221H1EQZrpnH44z+dO1KYd5LyqRwYh2euxU
cGqlx7Lu3DtInYPuqtTqg5rZWBH5HbqwqWHYSbcE/BaIef+q5O0qZTaByaqKpbcV
zBRdyMxrhoYdRiAvT1XBbKK8pGGun3w0CO1xUkSLANTKC+DRsklNswfFBQLDNCnl
7NxVNjUpPSWxFd5xi+/3r2luZNUN4J3E6Lp0jxnC2TFtvjzNZbA8ltx7o3faaRvu
si20njHpQwIDAQABo0IwQDAdBgNVHQ4EFgQUETrS36KuDNGCmbqXnWHmpipRibkw
EgYDVR0TAQH/BAgwBgEB/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQAD
ggGBAHjjHKI5RjYAUQjtL8cbrb6Dj2LP+m6LZmteKaS2YTGNPWoNCz33UXfugSgS
VZZcrm2JEjgoALCrZYT/lGGQgHz0/MuvSQSMOjhW60S3NSkU67p4HLuEB0TkwptG
dyv6CA2D5HaIrEqO+d6pP+OK19/JrJ3UG0S9I8UUzWmYCqqiqcfOosIexFWoqO4r
ASd+OQQoeOvnsiaFFoPtml6tOgoY7nBUQy61DTogWsAHBHSDTXNQy18EPB0jiQbT
/79niDnd82Wu+WY+9E4t2XW0jqUBQpw2bVVaZFcZ8EFtB4GWQbeVQLKw5L3HQVUX
q3/DRrJ2mWcRJxv4RrIDTyhLfDoqNNiRHqjLrsASHxIpSnuzX3fsAi0z5jcUsBQX
Re+y2Rt76OxOH+Bdm9Ik0lOndsu8Ge1cn249YWB+Tr+WBaFFdW/w7MeY/HkK5Pf/
EOmRoq87Lx10IaXlUKctpyIFNwmrvyF6fBEEyK3aa4/XsRyFTZjyfJSMkqniLj1w
oG1j9w==
-----END CERTIFICATE-----`,
    },
};

const pool = new Pool(config);

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
});

module.exports = pool;

// pool - queries frecuentes
// Conectar un nuevo cliente al servidor PostgreSQL requiere un protocolo de enlace que puede tardar entre 20 y 30 milisegundos. 
// Durante este tiempo, se negocian las contraseñas, se puede establecer SSL y se comparte la información de configuración con el cliente y el servidor. 
// Incurrir en este costo cada vez que se ejecuta una consulta ralentizaría considerablemente la aplicación.
// El servidor PostgreSQL solo puede manejar una cantidad limitada de clientes a la vez.
// PostgreSQL solo puede procesar una consulta a la vez en un solo cliente conectado, siguiendo el principio de "primero en entrar, primero en salir". 
// Si su aplicación web utiliza un solo cliente conectado, todas las consultas dse ejecutarán en serie, una tras otra.
// Simple query (automaticamente libera la conexion después del query)

// //Ejemplos de querys
// async function registerPerson(person) {
//   const text = `
//     INSERT INTO people (fullname, gender, phone, age)
//     VALUES ($1, $2, $3, $4)
//     RETURNING id
//   `;
//   const values = [person.fullname, person.gender, person.phone, person.age];
//   return pool.query(text, values);
// }

// async function getPerson(personId) {
//   const text = `SELECT * FROM people WHERE id = $1`;
//   const values = [personId];
//   return pool.query(text, values);
// }

// async function updatePersonName(personId, fullname) {
//   const text = `UPDATE people SET fullname = $2 WHERE id = $1`;
//   const values = [personId, fullname];
//   return pool.query(text, values);
// }

// async function removePerson(personId) {
//   const text = `DELETE FROM people WHERE id = $1`;
//   const values = [personId];
//   return pool.query(text, values);
// }

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
    