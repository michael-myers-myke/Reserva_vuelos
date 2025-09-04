const Reservas = require('../models/reservas');

class reservaController {
    reserva = async (data) => {
        try {
            const datosReserva = await Reservas.crearReserva(data);
            console.log("La reserva fue creada correctamente: ", datosReserva);
            return datosReserva;
        } catch (error) {
            console.error("Hubo un error al crear la reserva: ", error);
            throw error;
        }
    }

    reservaActualizar = async (idReserva, estado) => {
        try {
            const datosReserva = await Reservas.actualizarReserva(idReserva, estado);
            console.log("La reserva ha sido actualizada con exito");
        } catch (error) {
            console.error("No se ha podido actualizar la reserva: ", error);
        }
    }

    listarReservaUsuario = async (idUsuario) => {
        try {
            const datosReservaUsuario = await Reservas.listarReservasUsuario(idUsuario);
            console.log("Reservas del usuario: ");
            datosReservaUsuario.forEach(r => {
                console.log(`Reserva #${r.id_reserva} | Vuelo: ${r.ciudad_despegue} -> ${r.ciudad_destino} | Asientos: ${r.asientos_reservados}`);
            })
        } catch (error) {
            console.error("Hubo un problema al listar las reservas: ", error);
        }
    }
}

module.exports = reservaController;