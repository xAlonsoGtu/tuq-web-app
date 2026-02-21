//Importamos librerias
const express = require('express'); //rest api
const cors = require('cors'); //envio de peticiones dentro del servidor
const indexRouter = require('./routes/index.routes'); //cargamos archivo de rutas principal
require('dotenv').config(); //inciamos configuracion de archivo .env para guardar claves secretas

//Obtenemos el ambiente(pruebas o producción)
const nodeEnv = process.env.NODE_ENV || 'development';
//console.log(Running in ${nodeEnv} mode);

//Indicamos el puerto de escucha del servidor
const PORT = process.env.PORT || 3001;

//Iniciamos objeto express para crear el servidor api rest
const app = express();

//Configuramos servidor express
app.use(cors()) //Indicamos uso de cors (Cross-Origin Resource Sharing) - origen cruzado de datos
app.use(express.json()); //Indicamos uso de json para convertir peticiones en JSON
app.use(express.urlencoded({ extended: true })); //Indicamos uso de urlencoded para convertir form-data en JSON


//Para PRODUCCIÓN, descomentar cuando se vea la ejecución en PRO
//app.use(cors({origin: 'http://localhost:3000'}));
//app.use(cors({origin: 'http://app.tuq.com'}));
const _app_folder = __dirname + '/spa/build';
const _app_folder_assets = __dirname + '/spa/build/static';
app.get('/*file.js', express.static(_app_folder, {maxAge: '1y'}));
app.get('/*file.css', express.static(_app_folder, {maxAge: '1y'}));
app.get('/*file.ico', express.static(_app_folder, {maxAge: '1y'}));
app.get('/*file.png', express.static(_app_folder, {maxAge: '1y'}));
app.get('/*file.json', express.static(_app_folder, {maxAge: '1y'}));
app.use('/static', express.static(_app_folder_assets));

//Descomentar cuando se vea la carga de archivos
app.use('/public', express.static('./server/public'));
//app.use('/api/uploads', express.static('public/uploads'));

//Indicamos uso de rutas
app.use('/api', indexRouter);

//Para PRODUCCIÓN, descomentar cuando se vea la ejecución en PRO
app.get('/{*splat}', (req,res) => {
    //console.log(__dirname);
   res.sendFile(__dirname + "/spa/build/index.html")
});

//Iniciamos servidor en PORT
app.listen(PORT, () => {
    //console.log(listening on port ${PORT});
});