const pool = require('../db/conexion');

exports.crearTarifa = async ({clase,cantidadTarifa, idVuelo}) => {
    try {
        const tarifa = await pool.query(
            "insert into tarifas (clase, precio, id_vuelo) values ($1, $2, $3) returning *", [clase, cantidadTarifa, idVuelo]
        );
        return tarifa.rows;
    } catch (error) {
        console.error("Hubo un problema al crear la tarifa: ", error);
    }
};