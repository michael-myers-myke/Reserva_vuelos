const Tarifa = require('../models/tarifas');

class TarifaController {
    // Crear tarifa
    tarifa = async (data) => {
        try {
            const datosTarifa = await Tarifa.crearTarifa(data);
            console.log(" La tarifa ha sido registrada correctamente");
            return datosTarifa;
        } catch (error) {
            console.error(" Hubo un problema al registrar la tarifa", error);
        }
    }

    // Listar tarifas de un vuelo
    listarTarifas = async (idVuelo) => {
        try {
            const tarifas = await Tarifa.listarTarifasVuelo(idVuelo);
            if (tarifas.length === 0) {
                console.log("No hay tarifas registradas para este vuelo");
            }
            return tarifas;
        } catch (error) {
            console.error(" Hubo un problema al listar las tarifas del vuelo", error);
        }
    }
}

module.exports = TarifaController;
