//Importo clase express
const express=require('express');
//Importo métodos de express
const app=express();
//Importo clase cors
const cors = require('cors');
//Importo fichero ./router
const router = require('./router');
//Constante para el puerto remoto y local de la API
const PORT = process.env.PORT || 5500;

//Configuro cors
let corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
};

//Middlewares
//Para poder usar json
app.use(express.json());
//Para aplicar la configuración al cors
app.use(cors(corsOptions));  //USO CORS
//Para usar los enrutados del fichero router
app.use(router);

//Importo el fichero ./db/dbconnect
const dbconnect = require('./db/dbconnect');

//ejecuto el fichero dbconnect
dbconnect();

//levanto la API
app.listen(PORT, () => console.log(`Node server runing on http://localhost:${PORT}` ))


