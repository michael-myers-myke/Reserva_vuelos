const pool = require('../db/conexion');

exports.crearBoleto = async ({ idReserva, idUsuario, idVuelo, idAsiento }) => {
    try {
        const codigoBoleto = `BOLETO-${idReserva}-${idAsiento}-${Date.now()}`;
        const result = await pool.query(
            `INSERT INTO boletos (id_reserva, id_usuario, id_vuelo, id_asiento, codigo_boleto)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [idReserva, idUsuario, idVuelo, idAsiento, codigoBoleto]
        );
        return result.rows[0];
    } catch (error) {
        console.error(" Error al crear boleto:", error);
        throw error;
    }
};

exports.listarBoletosUsuario = async (idUsuario) => {
    try {
        const result = await pool.query(
            `SELECT b.*, 
                    r.ciudad_despegue, 
                    r.ciudad_destino, 
                    TO_CHAR(h.fecha_hora_despegue, 'YYYY-MM-DD HH24:MI') AS fecha_salida,
                    TO_CHAR(h.fecha_hora_aterrizaje, 'YYYY-MM-DD HH24:MI') AS fecha_llegada,
                    a.codigo_asiento
             FROM boletos b
             JOIN vuelos v ON b.id_vuelo = v.id_vuelo
             JOIN rutas r ON v.id_ruta = r.id_ruta
             JOIN horarios h ON v.id_horario = h.id_horario
             JOIN asientos a ON b.id_asiento = a.id_asiento
             WHERE b.id_usuario = $1`,
            [idUsuario]
        );
        return result.rows;
    } catch (error) {
        console.error(" Error al listar boletos:", error);
        throw error;
    }
};


