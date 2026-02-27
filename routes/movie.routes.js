const express = require('express');
const Movie = require('../models/Movie'); //se requiere express porque cada archivo de rutas necesita express
const router = express.Router();

//aqui creamos las rutas para todas las peliculas con router y se organizan

router.get('/', async (req, res) => {
try {
const movies = await Movie.find();
return res.status(200).json(movies); //para ver todas las peliculas
} catch (err) {
return res.status(500).json(err); //si no las encuentra salta error 500 (internal server error)
}
});

router.get('/id/:id', async (req, res) => {
try {
const movie = await Movie.findById(req.params.id);  //para buscarlas por id
if (movie) {
return res.status(200).json(movie);
} else {
return res.status(404).json('Pelicula no encontrada');
}
} catch (err) {
return res.status(500).json(err);
}
});


router.post('/', async (req, res) => {
try {
const newMovie = new Movie(req.body);
const createdMovie = await newMovie.save(); //para crear la peli
return res.status(201).json(createdMovie);
} catch (err) {
return res.status(500).json(err);
}
});


router.put('/:id', async (req, res) => {
try {
const { id } = req.params;
const movieUpdated = await Movie.findByIdAndUpdate(id, req.body, { new: true }); //para actualizar la peli
return res.status(200).json(movieUpdated);
} catch (err) {
return res.status(500).json(err);
}
});


router.delete('/:id', async (req, res) => {
try {
await Movie.findByIdAndDelete(req.params.id);
return res.status(200).json('Pelicula borrada'); //para borrar la peli
} catch (err) {
return res.status(500).json(err);
}
});

module.exports = router;
