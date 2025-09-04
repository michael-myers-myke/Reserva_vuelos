const Boletos = require('../models/boletos');

class BoletosController {
    async generarBoletos({ idReserva, idUsuario, idVuelo, asientos }) {
        try {
            let boletos = [];
            for (let idAsiento of asientos) {
                const boleto = await Boletos.crearBoleto({
                    idReserva,
                    idUsuario,
                    idVuelo,
                    idAsiento
                });
                boletos.push(boleto);
            }
            console.log(" Boletos generados:", boletos);
            return boletos;
        } catch (error) {
            console.error(" Error al generar boletos:", error);
        }
    }

    async listarBoletosUsuario(idUsuario) {
        return await Boletos.listarBoletosUsuario(idUsuario);
    }
}

module.exports = BoletosController;
