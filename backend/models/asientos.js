const pool = require("../db/conexion");

exports.crearAsientos = async (idVuelo) => {
    try {
        
        for(let fila = 1; fila <= 10; fila++){
            for(let letra of ['A','B','C','D','E','F']){
                await pool.query(
                    "INSERT INTO asientos (id_vuelo, codigo_asiento, estado) VALUES ($1, $2, $3)",
                    [idVuelo, `${fila}${letra}`, 'DISPONIBLE']
                );
            }
        }
        console.log("Asientos creados para el vuelo:", idVuelo);
    } catch (error) {
        console.error("Error creando asientos:", error);
    }
};

exports.listarAsientosPorVuelo = async (idVuelo) => {
    try {
        const result = await pool.query(`
            SELECT a.id_asiento, a.codigo_asiento, a.estado
            FROM asientos a
            WHERE a.id_vuelo = $1
        `, [idVuelo]);
        return result.rows;
    } catch (error) {
        console.error("Hubo un problema al listar asientos:", error);
    }
};
