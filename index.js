const express = require('express');
const { connect } = require('./utils/db');
const movieRoutes = require('./routes/movie.routes');

const server = express();

connect();

server.use(express.json());

server.use('/movies', movieRoutes);

server.use((req, res) => {
res.status(404).json('La ruta no existe'); //esto es para cuando no encuentre la ruta
});

server.use((err, req, res) => {
res.status(500).json('Error en el servidor'); //esto es para cuando de un error el servidor
});

server.listen(3000, () => {
console.log('Servidor OK en http://localhost:3000');
});

