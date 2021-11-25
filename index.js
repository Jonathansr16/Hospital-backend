require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// creamos el servidor express
const app = express();

//Base de Datos
dbConnection();

console.log(process.env);


//Configurar Cors
app.use(cors())

//Rutas
app.get('/', (request, respond) => {

    respond.json({
        ok: 'True',
        msg: 'Hola mundos'
    });
});

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto: ' + process.env.PORT);
});


/*
Notas:
  - Para las APIS seran en json

    */