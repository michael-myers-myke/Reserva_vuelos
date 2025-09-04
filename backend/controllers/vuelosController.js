const Vuelos = require('../models/vuelos');

class VuelosController {
    
    listarVuelos = async () => {
        try {
            return await Vuelos.listarVuelos();
        } catch (error) {
            console.error("Error en VuelosController.listar:", error);
            return [];
        }
    }
}

module.exports = new VuelosController();
