const express = require('express');//traemos la funcion express para crear el objeto del servidor que gestionará las peticiones.
const { connect } = require('./utils/db'); //se usa el connect de db.js para conectar con la base de datos
const movieRoutes = require('./routes/movie.routes'); //Trae el grupo de rutas que manejan todo lo relacionado con las películas.

const server = express(); //guardamos la funcion express importada en una variable para usarla despues

connect(); //usamos la funcion connect q hemos importado

server.use(express.json()); //convierte el json a un objeto de javascript para q el servidor lo entienda

server.use('/movies', movieRoutes);//Conecta el prefijo de la URL '/movies' con todas las rutas definidas en movieRoutes.

server.use((req, res) => {
res.status(404).json('La ruta no existe'); //esto es para cuando no encuentre la ruta
});

server.use((err, req, res) => {
res.status(500).json('Error en el servidor'); //esto es para cuando de un error el servidor
});

server.listen(3000, () => {
console.log('Servidor OK en http://localhost:3000'); // Arranca el servidor y lo pone a escuchar peticiones en el puerto 3000.
});

