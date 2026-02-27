const mongoose = require('mongoose');// importa la librería Mongoose para conectar y gestionar MongoDB.
const Schema = mongoose.Schema;// Carga la función que permite definir la estructura de nuestros datos.

const movieSchema = new Schema(// crea la plantilla que define qué campos (título, director, etc.) tendrá cada película.
  {
    title: { type: String, required: true },
    director: { type: String, required: true },  //las reglas del formulario
    year: { type: Number },
    genre: { type: String, required: true },
  },
  {
    timestamps: true, // añade la fecha de creación y de modificación al registro.
  }
);

const Movie = mongoose.model('Movie', movieSchema); //creamos nuestra variable movie q es la "oficial", cojemos la funcion model de
//mongoose (lo importamos arriba) , la función .model necesita el nombre de la colección y el esquema para crear el modelo.

module.exports = Movie; // exporta el modelo movie para que podamos usarlo en otros archivos (como en las rutas por ejemplo).