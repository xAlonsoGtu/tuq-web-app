
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const indexRouter = require('./routes/index.routes');

const nodeEnv = process.env.NODE_ENV || 'development';
console.log(`Running in ${nodeEnv} mode`);

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Para PRODUCCIÓN, descomentar cuando se vea la ejecución en PRO
//app.use(cors({origin: 'http://localhost:4200'}));
//app.use(cors({origin: 'http://app.tuq.com'}));
// const _app_folder = __dirname + '/spa/dist/spa';
// const _app_folder_assets = __dirname + '/spa/dist/spa/assets/media';
// app.get('*.js', express.static(_app_folder, {maxAge: '1y'}));
// app.get('*.css', express.static(_app_folder, {maxAge: '1y'}));
// app.get('*.ico', express.static(_app_folder, {maxAge: '1y'}));
// app.get('*.png', express.static(_app_folder, {maxAge: '1y'}));
// app.use('/assets/media', express.static(_app_folder_assets));

//Descomentar cuando se vea la carga de archivos
//app.use('/public', express.static('public'));
//app.use('/api/uploads', express.static('public/uploads'));

app.use('/api', indexRouter);

//Para PRODUCCIÓN, descomentar cuando se vea la ejecución en PRO
// app.get('*', (req,res) => {
//   res.sendFile(__dirname + "/spa/dist/spa/index.html")
// });


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
