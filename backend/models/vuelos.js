const pool = require('../db/conexion');

exports.crearVuelo = async ({id_aerolinea, id_ruta, id_horario}) => {
    try {
        const result = await pool.query(
            "insert into vuelos (id_aerolinea, id_ruta, id_horario) values ($1, $2, $3) returning *", [id_aerolinea, id_ruta, id_horario]
        );
        return result.rows;
    } catch (error) {
        console.error("Hubo un problema al crear el vuelo: ", error);
    }
};

exports.listarVuelos = async () => {
    try {
        const result = await pool.query(
        `SELECT v.id_vuelo, 
            a.nombre_aerolinea AS aerolinea, 
            r.ciudad_despegue, 
            r.ciudad_destino, 
            TO_CHAR(h.fecha_hora_despegue, 'YYYY-MM-DD HH24:MI') AS fecha_hora_despegue,
            TO_CHAR(h.fecha_hora_aterrizaje, 'YYYY-MM-DD HH24:MI') AS fecha_hora_aterrizaje
        FROM vuelos v
        JOIN aerolineas a ON v.id_aerolinea = a.id_aerolineas
        JOIN rutas r ON v.id_ruta = r.id_ruta
        JOIN horarios h ON v.id_horario = h.id_horario`
        );
        return result.rows;
    } catch (error) {
        console.error("Error al listar vuelos:", error);
    }
};