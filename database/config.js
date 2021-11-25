const mongoose = require('mongoose');
const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('Conexion exitosa!!');
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la BD');
    }
}

module.exports = {
    dbConnection
}