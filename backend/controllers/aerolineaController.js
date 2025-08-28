const Aerolinea = require('../models/aerolinea');


class AerolineaController {

    aerolineas = async (data) => {
        try {
            const datosAerolinea = await Aerolinea.crearAerolinea(data);
            console.log("La aerolinea fue registrada en el sistema correctamente: ", datosAerolinea.nombre_aerolinea);
        } catch (error) {
            console.error("Hubo un error al registrar esta aerolinea: ", error);
        }
    }

    listaAerolineas = async () => {
        try {
            return await Aerolinea.listarAerolineas();
        } catch (error) {
            console.log("hubo un problema al listar las aerolineas", error);
        }
    }

}

module.exports = AerolineaController;