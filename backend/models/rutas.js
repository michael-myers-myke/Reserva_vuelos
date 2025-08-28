const pool = require('../db/conexion');

exports.crearRutas = async ({ciudadDespegue, ciudadDestino, vueloDirecto, nombreAerolinea}) => {
    try {
        const aerolineaRuta = await pool.query(
            "select id_aerolineas from aerolineas where nombre_aerolinea = $1", [nombreAerolinea]
        );

        if(aerolineaRuta.rows.length === 0){
            console.error("La aerolinea seleccionada no existe");
        }

        const id_aerolinea = aerolineaRuta.rows[0].id_aerolineas;

        const result = await pool.query(
            "insert into rutas (ciudad_despegue, ciudad_destino, vuelo_directo, id_aerolineas) values ($1, $2, $3, $4) returning * ", [ciudadDespegue, ciudadDestino, vueloDirecto, id_aerolinea]
        );
    } catch (error) {
        console.error("Hubo un error al crear la ruta: ", error);
    }
};

exports.listarRutas = async () => {
    try {
        const datosRuta = await pool.query("select ciudad_despegue, ciudad_destino from rutas");

        if(datosRuta.rows.length === 0){
            console.log("No hay rutas registradas");
        }

        return datosRuta.rows;
    } catch (error) {
        console.error("Hubo un problema al listar las rutas", error);
    }
}

exports.listarRutasAerolinea = async (idAerolinea) => {
    try {
        const data = await pool.query(
            "select id_ruta, ciudad_despegue, ciudad_destino from rutas where id_aerolineas = $1", [idAerolinea]
        );

        return data.rows;
    } catch (error) {
        console.error("Hubo un problema las rutas por aerolinea: ", error); 
    }
}