const Usuario = require('./models/usuarios.model');

require('dotenv').config();


const express = require('express');
const cors = require('cors');


const { dbConnection } = require('./database/config');

// creamos el servidor express node
const app = express();

//Configurar Cors
app.use(cors());

//Lectura de Body
app.use(express.json());

//Base de Datos
dbConnection();

//Rutas
app.use('/api/usuarios', require('./routes/usuarios.routes') );
app.use('/api/login', require('./routes/auth') );

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto: ' + process.env.PORT);
});