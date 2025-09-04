const Pagos = require('../models/pagos');

class PagosController {
    async registrarPago(data) {
        try {
            const pago = await Pagos.crearPago(data);
            console.log(" Pago registrado correctamente:", pago);
            return pago;
        } catch (error) {
            console.error(" Error al registrar el pago:", error);
        }
    }
}

module.exports = PagosController;
