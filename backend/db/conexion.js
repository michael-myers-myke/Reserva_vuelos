//conexion a la db librerias pg y dotenv usadas
const {Pool} = require('pg');
require('dotenv').config({path: __dirname + '/../.env'});

//Variable que se usa para generar y llamar la url del .env con los datos para la conexion
const pool = new Pool ({
    connectionString: process.env.DB_URL,
});

pool.connect()
    .then(() => console.log("Conexion a la db exitosa"))
    .catch(err => console.error("Error en la conexion", err));

module.exports = pool;