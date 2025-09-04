const pool = require('../db/conexion');

exports.crearTarifa = async ({clase, precio, idVuelo}) => {
    try {
        const tarifa = await pool.query(
            "INSERT INTO tarifas (clase, precio, id_vuelo) VALUES ($1, $2, $3) RETURNING *",
            [clase, precio, idVuelo]
        );
        return tarifa.rows[0];
    } catch (error) {
        console.error(" Hubo un problema al crear la tarifa: ", error);
        throw error;
    }
};


exports.listarTarifasVuelo = async (idVuelo) => {
    try {
        const result = await pool.query(
            "SELECT id_tarifa, clase, precio FROM tarifas WHERE id_vuelo = $1",
            [idVuelo]
        );

        return result.rows; 
    } catch (error) {
        console.error(" Hubo un problema al listar las tarifas del vuelo", error);
        throw error;
    }
};
