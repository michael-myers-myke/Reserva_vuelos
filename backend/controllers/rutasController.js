const Rutas = require('../models/rutas');

class RutasController{
    rutas = async (data) => {
        try {
            const datosRutas = await Rutas.crearRutas(data);
            console.log("La ruta ha sido registrada correctamente")
        } catch (error) {
            console.error("Hubo un error al registar esta ruta: ", error);
        }
    }

    listaRutas = async () => {
        try {
            return await Rutas.listarRutas();
        } catch (error) {
            console.error("Hubo un problema al listar las rutas", error);
        }
    }

    listarRutasAerolinea = async (idAerolinea) => {
        try {
            return await Rutas.listarRutasAerolinea(idAerolinea);
        } catch (error) {
            console.error("Hubo un problema con las rutas registradas para esta aerolinea: ", error);
        }
    }
};

module.exports = RutasController;