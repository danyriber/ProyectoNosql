const express = require('express');     //se requiere express porque cada archivo de rutas necesita express
const Movie = require('../models/Movie');   //sin el modelo no sabria a q coleccion de mongo "atacar"
const router = express.Router();

//aqui creamos las rutas para todas las peliculas con router y se organizan

router.get('/', async (req, res) => {   // si escribes en el navegador http://localhost:3000/movies/, se dispara esta función
try {                                   //aqui estarian todas las peliculas
const movies = await Movie.find();      //frena y espera a que Movie.find() me traiga todas las peliculas y cuando los tenga sigue", asincronia.
return res.status(200).json(movies);    // envia un código de éxito (200) y la lista de películas en formato JSON.
} catch (err) {
return res.status(500).json(err);       //si no las encuentra salta error 500 (internal server error)
}
});

router.get('/id/:id', async (req, res) => {
try {
const movie = await Movie.findById(req.params.id);      //req.params.id: Es la forma que tiene Express de leer lo que escribiste
// findByID es una función que viene dentro de Mongoose, necesita el ID y ella sola va a MongoDB a buscarlo
if (movie) {
return res.status(200).json(movie);       // Si la película existe, devuelve un código 200 (OK) y los datos de la película en formato JSON.
}
return res.status(404).json('Pelicula no encontrada');      // Si no hay película, responde con un código 404 (No encontrado) y un mensaje de error.

} catch (err) {
return res.status(500).json(err);       //catch atrapa el error , si se pone una palabra cualquiera evita q el servidor se apague
}                                       // guarda el fallo en (err), 500 es error interno del servidor
});                                     //json(err) envia la info en formato json


router.post('/', async (req, res) => {      //post es para crear una peli nueva por ejemplo
try {
const newMovie = new Movie(req.body);           // creas una nueva peli con los datos que le des (body)
const createdMovie = await newMovie.save();     //el servidor llama a mongodb y le ordena guardarlo con asincronia, espera a ejecutarse
return res.status(201).json(createdMovie);      // Responde con el código 201 (recurso creado) y devuelve la película recién guardada con su ID asignado.
} catch (err) {
return res.status(500).json(err);
}
});


router.put('/:id', async (req, res) => {        //para modificar usamos put, aqui se busca por id
try {
const { id } = req.params;      //se saca el id por los params con destructuring
const movieUpdated = await Movie.findByIdAndUpdate(id, req.body, { new: true }); //Primero busca el ID y luego le aplica los cambios que tú hayas escrito en el JSON
                                            // el new true es para q t devuelva la version actualizada y no la anterior
return res.status(200).json(movieUpdated); 
} catch (err) {
return res.status(500).json(err);
}
});


router.delete('/:id', async (req, res) => { //para borrar usamos delete por id
try {
await Movie.findByIdAndDelete(req.params.id); //esta funcion busca por id q demos en params y borra si la encuentra 
return res.status(200).json('Pelicula borrada'); 
} catch (err) {
return res.status(500).json(err);
}
});

module.exports = router;
