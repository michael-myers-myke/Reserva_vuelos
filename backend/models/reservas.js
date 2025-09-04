const pool = require('../db/conexion');



exports.crearReserva = async ({idVuelo, idUsuario, idTarifa, cantidadPasajeros, asientos}) => {
    try {
        // 1. Crear la reserva
        const reservaResult = await pool.query(
            `INSERT INTO reservas (id_vuelo, id_usuario, id_tarifa, cantidad_pasajeros) 
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [idVuelo, idUsuario, idTarifa, cantidadPasajeros]
        );

        const reserva = reservaResult.rows[0];

        // 2. Marcar asientos como reservados
        if (asientos && asientos.length > 0) {
            for (let idAsiento of asientos) {
                await pool.query(
                    "UPDATE asientos SET estado = 'RESERVADO', id_reserva = $1 WHERE id_asiento = $2",
                    [reserva.id_reserva, idAsiento]
                );
            }
        }

        return reserva;
    } catch (error) {
        console.error("Ha ocurrido un problema al crear su reserva: ", error);
        throw error;
    }
};




exports.actualizarReserva = async (idReserva, nuevoEstado) => {
    try {
        const result = await pool.query(
            "update reservas set estado = $1 where id_reserva = $2 returning * ", [nuevoEstado, idReserva]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Hubo un problema al actualizar el estado de su reserva: ", error);
    }
};

exports.listarReservasUsuario = async (idUsuario) => {
    try {
        const result = await pool.query(
            `SELECT r.*, v.id_vuelo, a.nombre_aerolinea, rt.ciudad_despegue, rt.ciudad_destino,
                    t.clase, t.precio, h.fecha_hora_despegue, h.fecha_hora_aterrizaje,
                    ARRAY_AGG(s.id_asiento) AS asientos_reservados
             FROM reservas r
             JOIN vuelos v ON r.id_vuelo = v.id_vuelo
             JOIN aerolineas a ON v.id_aerolinea = a.id_aerolineas
             JOIN rutas rt ON v.id_ruta = rt.id_ruta
             JOIN horarios h ON v.id_horario = h.id_horario
             JOIN tarifas t ON r.id_tarifa = t.id_tarifa
             LEFT JOIN asientos s ON r.id_reserva = s.id_reserva
             WHERE r.id_usuario = $1
             GROUP BY r.id_reserva, v.id_vuelo, a.nombre_aerolinea, rt.ciudad_despegue, 
                      rt.ciudad_destino, t.clase, t.precio, h.fecha_hora_despegue, h.fecha_hora_aterrizaje
             ORDER BY r.fecha_reserva DESC`,
            [idUsuario]
        );
        return result.rows;
    } catch (error) {
        console.error("Error al listar reservas:", error);
    }
};
