const pool = require('../db/conexion');

exports.crearAerolinea = async ({nombre, cantidadAsientos}) => {
    try {
        const aerolineasDuplicadas = await pool.query(
            "SELECT * FROM aerolineas WHERE nombre_aerolinea = $1", [nombre]
        );

        if(aerolineasDuplicadas.rows.length > 0) {
            throw new Error("La aerolinea ya existe");
        }

        const result = await pool.query(
            "INSERT INTO aerolineas (nombre_aerolinea, cantidad_asientos) VALUES ($1, $2) RETURNING *",
            [nombre, cantidadAsientos]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Hubo un problema al crear la aerolinea: ", error);
    }
};

exports.listarAerolineas = async () => {
    try {
        const datosAerolinea = await pool.query(
            "select id_aerolineas, nombre_aerolinea from aerolineas"
        );
        
        if(datosAerolinea.rows.length === 0){
            console.log("No hay aerolineas registradas");
        }

        return datosAerolinea.rows;
    } catch (error) {
        console.error("Ha ocurrido un problema al listar las aerolineas", error);
    }
}