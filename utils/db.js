const mongoose = require('mongoose'); //traemos mongo

const urlDb = 'mongodb://localhost:27017/proyecto-basico-express-movies'  //puerta estandard de mongoDB

const connect = async () => {  //creamos una variable de nuestra funcion de conexion con la base de datos, como va a tardar ponemos async
    try {
        await mongoose.connect(urlDb);      //orden de ejecución para conectar. Usa la librería Mongoose para llamar a la dirección que guardamps en urlDb.
        console.log(`Conectado exitosamente`);  
    }catch(error) {
        console.log('Error de conexion con la base de datos')
    };
}

module.exports = {
    connect
};