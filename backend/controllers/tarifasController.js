const Tarifa = require('../models/tarifas');

class tarifaController {
    tarifa = async (data) => {
        try {
            const datosTarifa = await Tarifa.crearTarifa(data);
            console.log("La tarifa ha sido registrada correctamente");
        } catch (error) {
            console.error("Hubo un problema al registrar la tarifa", error);
        }
    }
}

module.exports = tarifaController;