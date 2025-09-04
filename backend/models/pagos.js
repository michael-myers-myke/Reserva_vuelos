const pool = require('../db/conexion');

exports.crearPago = async ({ idReserva, metodoPago, total, numeroTarjeta, nombreTitular, vencimiento, cvv }) => {
    try {
        const result = await pool.query(
            `INSERT INTO pagos (id_reserva, metodo_pago, total, numero_tarjeta, nombre_titular, vencimiento_tarjeta, cvv, estado)
             VALUES ($1, $2, $3, $4, $5, $6, $7, 'PENDIENTE') RETURNING *`,
            [idReserva, metodoPago, total, numeroTarjeta || null, nombreTitular || null, vencimiento || null, cvv || null]
        );
        return result.rows[0];
    } catch (error) {
        console.error(" Error al crear pago:", error);
        throw error;
    }
};
