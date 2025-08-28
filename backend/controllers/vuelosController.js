const Vuelos = require('../models/vuelos');

class VuelosController {
    // Para cuando lo uses desde Express
    listarVuelosHttp = async (req, res) => {
        try {
            const vuelos = await Vuelos.listarVuelos();
            res.status(200).json(vuelos);
        } catch (error) {
            console.error("Error en VuelosController.listar:", error);
            res.status(500).json({ error: "No se pudo listar vuelos" });
        }
    }

    // Para cuando lo uses desde consola
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
