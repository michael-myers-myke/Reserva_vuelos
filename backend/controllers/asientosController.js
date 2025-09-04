const Asientos = require("../models/asientos");

class AsientosController {
    listarAsientosVuelo = async (idVuelo) => {
        try {
            return await Asientos.listarAsientosPorVuelo(idVuelo);
        } catch (error) {
            console.error(" Hubo un problema al listar asientos:", error);
            throw error;
        }
    };

    reservarAsiento = async (idAsiento) => {
        try {
            await Asientos.actualizarEstadoAsiento(idAsiento, "OCUPADO");
        } catch (error) {
            console.error(" Hubo un problema al reservar asiento:", error);
            throw error;
        }
    };
}

module.exports = AsientosController;
