const pool = require('../db/conexion');

exports.crearHorarios = async ({horaDespegue, horaAterrizaje, idRuta}) => {
    try {
        //Se consulta y se toma el id de la aerolinea de la tabla rutas que esta conectada a las aerolineas en la db
        const aerolinea = await pool.query(
            "select id_aerolineas from rutas where id_ruta = $1", [idRuta]
        );

        if(aerolinea.rows.length === 0){
            console.log("La aerolinea seleccionada no existe");
        }

        const idAerolinea = aerolinea.rows[0].id_aerolineas;

        const result = await pool.query(
            "insert into horarios (fecha_hora_despegue, fecha_hora_aterrizaje, id_ruta, id_aerolineas) values ($1, $2, $3, $4) returning *", [horaDespegue, horaAterrizaje, idRuta, idAerolinea]
        );

        const nuevoHorario = result.rows[0];

        const vuelos = await pool.query(
            "insert into vuelos (id_aerolinea, id_ruta, id_horario) values ($1, $2, $3) returning *", [idAerolinea, idRuta, nuevoHorario.id_horario]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Ha ocurrido un error, no se ha podido crear el horario para la aerolínea", error);
    }
};