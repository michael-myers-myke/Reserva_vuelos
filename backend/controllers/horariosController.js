const Horario = require('../models/horarios');

class HorariosController {
    horarios = async(data) => {
        try {
            const datosHorario = await Horario.crearHorarios(data);
            console.log("EL horario ha sido registrado correctamente");
        } catch (error) {
            console.error("Ocurrio un error al registrar este horario: ", error);
        }
    }
};

module.exports = HorariosController;