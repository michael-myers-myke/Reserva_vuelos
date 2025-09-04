const pool = require('../db/conexion');
const Asientos = require('./asientos');

exports.crearHorarios = async ({horaDespegue, horaAterrizaje, idRuta}) => {
    try {
        
        const aerolinea = await pool.query(
            "SELECT id_aerolineas FROM rutas WHERE id_ruta = $1", 
            [idRuta]
        );

        if(aerolinea.rows.length === 0){
            console.log("La aerolínea seleccionada no existe");
            return;
        }

        const idAerolinea = aerolinea.rows[0].id_aerolineas;

        
        const result = await pool.query(
            `INSERT INTO horarios (fecha_hora_despegue, fecha_hora_aterrizaje, id_ruta, id_aerolineas) 
             VALUES ($1, $2, $3, $4) RETURNING *`, 
            [horaDespegue, horaAterrizaje, idRuta, idAerolinea]
        );

        const nuevoHorario = result.rows[0];


        const vuelos = await pool.query(
            `INSERT INTO vuelos (id_aerolinea, id_ruta, id_horario) 
             VALUES ($1, $2, $3) RETURNING *`, 
            [idAerolinea, idRuta, nuevoHorario.id_horario]
        );

        const nuevoVuelo = vuelos.rows[0];

        
        await Asientos.crearAsientos(nuevoVuelo.id_vuelo);

        return nuevoHorario;
    } catch (error) {
        console.error("Ha ocurrido un error, no se ha podido crear el horario para la aerolínea", error);
    }
};
