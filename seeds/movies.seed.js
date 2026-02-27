const mongoose = require('mongoose');       //necesario para borrar y crear
const Movie = require('../models/Movie');   //aplica las reglas q deben cumplir las peliculas
const movies = [
  {
    title: 'The Matrix',
    director: 'Hermanas Wachowski',
    year: 1999,
    genre: 'Acción',
  },
  {
    title: 'The Matrix Reloaded',
    director: 'Hermanas Wachowski',
    year: 2003,
    genre: 'Acción',
  },
  {
    title: 'Buscando a Nemo',
    director: 'Andrew Stanton',
    year: 2003,
    genre: 'Animación',
  },
  {
    title: 'Buscando a Dory',
    director: 'Andrew Stanton',
    year: 2016,
    genre: 'Animación',
  },
  {
    title: 'Interestelar',
    director: 'Christopher Nolan',
    year: 2014,
    genre: 'Ciencia ficción',
  },
  {
    title: '50 primeras citas',
    director: 'Peter Segal',
    year: 2004,
    genre: 'Comedia romántica',
  },
];
const movieDocuments = movies.map(movie => new Movie(movie));   // Convierte el array de objetos simples en documentos oficiales del modelo Movie.
mongoose   // Inicia el proceso de conexión y gestión con la base de datos.
  .connect('mongodb://localhost:27017/proyecto-basico-express-movies')   //establece conexion con MongoDB
  .then(async () => {   //si la conexion es exitosa haz esto
    const allMovies = await Movie.find();   //busca todas las pelis
    if (allMovies.length) {     //si tiene iteracion (hay pelis dentro) 
      await Movie.collection.drop();    //espero a q las borres
    }
  })
  .catch((err) => console.log(`Error borrando datos: ${err}`))  //si falla el borrado salta esto
  .then(async () => {       //mete todo el array de peliculas y espera con async a q termine, y lanza el console log
		await Movie.insertMany(movieDocuments);
    console.log('Base de datos creada')
	})
  .catch((err) => console.log(`Error creando datos: ${err}`))   //si fallara lanzaria el error
  .finally(() => mongoose.disconnect());    // Pase lo que pase, cierra la conexión con la base de datos para que el proceso termine y no se quede colgado en la terminal.