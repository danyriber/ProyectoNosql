const express = require('express');
const Movie = require('../models/Movie');
const router = express.Router();

// OBTENER TODAS LAS PELICULAS
router.get('/', async (req, res) => {
try {
const movies = await Movie.find();
return res.status(200).json(movies);
} catch (err) {
return res.status(500).json(err);
}
});

// BUSCAR POR ID
router.get('/id/:id', async (req, res) => {
try {
const movie = await Movie.findById(req.params.id);
if (movie) {
return res.status(200).json(movie);
} else {
return res.status(404).json('Pelicula no encontrada');
}
} catch (err) {
return res.status(500).json(err);
}
});

// CREAR PELICULA
router.post('/', async (req, res) => {
try {
const newMovie = new Movie(req.body);
const createdMovie = await newMovie.save();
return res.status(201).json(createdMovie);
} catch (err) {
return res.status(500).json(err);
}
});

// EDITAR PELICULA
router.put('/:id', async (req, res) => {
try {
const { id } = req.params;
const movieUpdated = await Movie.findByIdAndUpdate(id, req.body, { new: true });
return res.status(200).json(movieUpdated);
} catch (err) {
return res.status(500).json(err);
}
});

// BORRAR PELICULA
router.delete('/:id', async (req, res) => {
try {
await Movie.findByIdAndDelete(req.params.id);
return res.status(200).json('Pelicula borrada');
} catch (err) {
return res.status(500).json(err);
}
});

module.exports = router;
