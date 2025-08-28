const prompt = require('prompt-sync')();
const UsuarioController = require('../controllers/usuarioController');
const usuarioController = new UsuarioController();
const AerolineaController = require('../controllers/aerolineaController');
const aerolineaController = new AerolineaController();
const RutaController = require('../controllers/rutasController');
const rutaController = new RutaController();
const HorariosController = require('../controllers/horariosController');
const horariosController = new HorariosController();
const TarifasController = require('../controllers/tarifasController');
const tarifasController = new TarifasController();
const VuelosController = require('../controllers/vuelosController');
// const { parse } = require('dotenv');


async function menu() {
    console.log("**********************");
    console.log("BIENVENIDO AL SISTEMA DE RESERVA DE VUELOS");
    console.log("**********************");
    console.log("Primero debes crear los datos para que el sistema de reserva de vuelos.");
    console.log("**********************");
    console.log("1.Crear Aerolinea");
    console.log("2.Crear Ruta");
    console.log("3.Crear Horario");
    console.log("4.Crear Tarifa");
    console.log("5.Salir");
    console.log("**********************");

    const opcion = prompt("Elige una opcion: ");
    if(opcion === '1'){
        menuAerolinea();
    }else if (opcion === '2'){
        menuRutas();
    } else if( opcion === '3'){
        menuHorarios();
    } else if (opcion === '4'){
        menuTarifas();
    } else if (opcion === '5') {
        process.exit();
    }
}

async function menuPrincipal() {
    console.log("**********************");
    console.log("BIENVENIDO AL SISTEMA DE RESERVA DE VUELOS");
    console.log("**********************");
    console.log("1.Registrarse");
    console.log("2.Iniciar sesion");
    console.log("3.Crear datos");
    console.log("4.Salir");
    console.log("**********************");

    const opcion = parseInt(prompt("Elige una opcion: "));
    if(opcion === "1"){
        datosRegistro();
    } else if (opcion === "2") {
        datosLogin();
    } else if (opcion === "3") {
        menu();
    } else if(opcion === "4") {
        process.exit();
    }
}


async function menuAerolinea() {
    console.log("**********************");
    console.log("ESTE ES EL MENU DE AEROLINEAS");
    console.log("**********************");
    const aerolineas = await aerolineaController.listaAerolineas();
    console.log("Aerolineas registradas:");
    aerolineas.forEach(a => console.log(`${a.nombre_aerolinea}`));
    const nombre = prompt("Ingrese el nombre de la aerolinea: ");
    const cantidadAsientos = parseInt(prompt("Ingrese la cantidad de asientos: "));
    await aerolineaController.aerolineas({nombre, cantidadAsientos});
    menu();
}

async function menuRutas() {
    console.log("**********************");
    console.log("ESTE ES EL MENU DE RUTAS");
    console.log("**********************");
    const rutas = await rutaController.listaRutas();
    console.log("Rutas registradas:");
    rutas.forEach(r => console.log(`${r.ciudad_despegue} -> ${r.ciudad_destino}`));
    const ciudadDespegue = prompt("Ingrese la ciudad de despegue: "); 
    const ciudadDestino = prompt("Ingrese la ciudad destino: ");
    const vueloDirecto = prompt("Ingrese T si es directo y F si no es directo: ");
    const aerolineas = await aerolineaController.listaAerolineas();
    console.log("Aerolineas Registradas:");
    aerolineas.forEach(a => console.log(`${a.nombre_aerolinea}`));
    const nombreAerolinea = prompt("Ingrese el nombre de la aerolinea a la cual le va a crear la ruta: ");
    await rutaController.rutas({ciudadDespegue, ciudadDestino, vueloDirecto: vueloDirecto === 'true', nombreAerolinea});
    menu();
}

async function menuHorarios() {
    console.log("**********************");
    console.log("ESTE ES EL MENU DE HORARIOS");
    console.log("**********************");
    // Mostrar aerolíneas como menú numerado
    const aerolineas = await aerolineaController.listaAerolineas();
    console.log("Aerolineas Registradas:");
    aerolineas.forEach((a, i) => console.log(`${i + 1}: ${a.nombre_aerolinea}`));
    const opcionAerolinea = parseInt(prompt("Seleccione el número de la aerolínea: "));
    const aerolineaSeleccionada = aerolineas[opcionAerolinea - 1];
    const nombreAerolinea = aerolineaSeleccionada.nombre_aerolinea;
    const idAerolinea = aerolineaSeleccionada.id_aerolineas;
    // Mostrar solo las rutas de esa aerolínea
    const rutas = await rutaController.listarRutasAerolinea(idAerolinea);
    if (rutas.length === 0) {
        console.log("No hay rutas creadas en esta aerolínea.");
        return menu();
    }
    console.log("Rutas de la aerolínea seleccionada:");
    rutas.forEach((r, i) => console.log(`${i + 1}: ${r.ciudad_despegue} -> ${r.ciudad_destino}`));
    const opcionRuta = parseInt(prompt("Seleccione el número de la ruta: "));
    const rutaSeleccionada = rutas[opcionRuta - 1];
    const idRuta = rutaSeleccionada.id_ruta;
    const horaDespegue = prompt("Ingrese la fecha y hora de despegue (YYYY-MM-DD HH:MM): ");
    const horaAterrizaje = prompt("Ingrese la fecha y hora de aterrizaje (YYYY-MM-DD HH:MM): ");
    await horariosController.horarios({horaDespegue, horaAterrizaje, nombreAerolinea, idRuta});
    menu();
}

async function menuTarifas() {
    console.log("**********************");
    console.log("ESTE ES EL MENU DE TARIFAS");
    console.log("**********************");
    const vuelos = await VuelosController.listarVuelos();
    console.log("Vuelos registrados: ");
    vuelos.forEach((v, i) => console.log(`${i + 1}: ${v.aerolinea} | ${v.ciudad_despegue} -> ${v.ciudad_destino} | ${v.fecha_hora_despegue} | ${v.fecha_hora_aterrizaje}`));
    const opcionVuelo = parseInt(prompt("Seleccion el numero del vuelo al cual va a crear la tarifa: "));
    const vueloSeleccionado = vuelos[opcionVuelo - 1];
    if(!vueloSeleccionado){
        console.log("Opcion de vuelo seleccionada no valida");
        return menuTarifas();
    }
    const clase = prompt("Ingrese la clase de su vuelo: {Economica, Ejecutiva, Primera}: ");
    const cantidadTarifa = parseInt(prompt("Ingrese el precio de la tarifa de su vuelo: "));

    await tarifasController.tarifa({ idVuelo: vueloSeleccionado.id_vuelo, clase, cantidadTarifa});
    console.log("La tarifa ha sido creada con exito");
    menu();
}

async function datosRegistro() {
    const nombre = prompt("Ingrese su nombre: ");
    const email = prompt("Ingrese su email: ");
    const password = prompt("Ingrese su contraseña: ");
    await usuarioController.registrar({nombre,email,password});
    menu();
}

async function datosLogin() {
    const email = prompt("Ingrese su email: ");
    const password = prompt("Ingrese su contraseña: ");
    await usuarioController.login({email, password});
    menuReservas();
}

async function menuReservas(){
    console.log("**********************");
    console.log("BIENVENIDO AL SISTEMA");
    console.log("**********************");
    console.log("1.Ver vuelos");
    console.log("2.Reservar");
    console.log("3.Comprar boletos");

    const opcion = parseInt(prompt("Elija una opcion"));

    if(opcion === "1"){
        consultaVuelos();
    } else if(opcion === "2"){
        Reserva();
    } else if(opcion === "3"){
        Boletos();
    }
}

async function consultaVuelos() {

}

async function Reserva() {

}

async function Boletos() {

}

module.exports = {
    menuPrincipal,
    menu
}