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
const AsientosController = require('../controllers/asientosController');
const asientosController = new AsientosController();
const PagosController = require('../controllers/pagosController');
const pagosController = new PagosController();
const ReservasController = require('../controllers/reservasController');
const reservasController = new ReservasController();
const BoletosController = require('../controllers/boletosController');
const boletoscontroller = new BoletosController();
const sesion = require('../utils/sesion');



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

    const opcion = prompt("Elige una opcion: ");
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
    const precio = parseInt(prompt("Ingrese el precio de la tarifa de su vuelo: "));

    await tarifasController.tarifa({ idVuelo: vueloSeleccionado.id_vuelo, clase, precio});
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
    console.log("3.Mis reservas");
    console.log("4.Mis boletos");
    console.log("5.Salir");

    const opcion = prompt("Elija una opcion: ");

    if(opcion === "1"){
        consultaVuelos();
    } else if(opcion === "2"){
        Reserva();
    } else if(opcion === "3"){
        misReservas();
    } else if (opcion === "4"){
        Boletos();
    } else if(opcion === "5") {
        process.exit();
    }
}

async function consultaVuelos() {
    console.log("******************")
    console.log("Lista de vuelos")
    console.log("******************")
    const vuelos = await VuelosController.listarVuelos();
    console.log("VUELOS: ");
    vuelos.forEach((v, i) => console.log(`${i + 1}: ${v.aerolinea} | ${v.ciudad_despegue} -> ${v.ciudad_destino} | ${v.fecha_hora_despegue} | ${v.fecha_hora_aterrizaje}`));
    menuReservas();
}

async function Reserva() {
    console.log("******************")
    console.log("RESERVAS");
    console.log("******************")

    
    const usuario = sesion.getUsuario();
    if (!usuario) {
        console.log(" Debes iniciar sesión antes de reservar.");
        return menuPrincipal();
    }

    const vuelos = await VuelosController.listarVuelos();
    console.log("Vuelos disponibles: ");
    vuelos.forEach((v, i) => console.log(`${i + 1}: ${v.ciudad_despegue} | ${v.ciudad_destino} | ${v.fecha_hora_despegue} | ${v.fecha_hora_aterrizaje}`));
    const opcionVuelo = parseInt(prompt("Ingrese el numero del vuelo que quiere reservar: "));
    const vueloSeleccionado = vuelos[opcionVuelo - 1];
    if(!vueloSeleccionado){
        console.log("opcion no valida escoge un vuelo valido");
        return Reserva();
    }
    
    const tarifas = await tarifasController.listarTarifas(vueloSeleccionado.id_vuelo);
    if (tarifas.length === 0) {
        console.log("⚠ Este vuelo no tiene tarifas registradas aún.");
        return menuReservas();
    }

    console.log("Tarifas registradas para este vuelo: ");
    tarifas.forEach((t, i) => 
        console.log(`${i + 1}: Clase: ${t.clase} | Precio: $${t.precio}`)
    );
    const opcionTarifa = parseInt(prompt("Ingrese el número de la tarifa que quiere seleccionar: "));
    const tarifaSeleccionada = tarifas[opcionTarifa - 1];
    if (!tarifaSeleccionada) {
        console.log("⚠ Opción no válida, escoge una tarifa válida");
        return Reserva();
    }
    console.log(` Has seleccionado la tarifa ${tarifaSeleccionada.clase} con precio $${tarifaSeleccionada.precio}`);

    const asientos = await asientosController.listarAsientosVuelo(vueloSeleccionado.id_vuelo);
    const asientosDisponibles = asientos.filter(a => a.estado === 'DISPONIBLE');

    if (asientosDisponibles.length === 0) {
        console.log("⚠ No hay asientos disponibles en este vuelo.");
        return menuReservas();
    }

    console.log("Asientos disponibles: ");
    asientosDisponibles.forEach((a, i) => 
        console.log(`${i + 1}: Código ${a.codigo_asiento} | Estado: ${a.estado}`)
    );

    const cantidad = parseInt(prompt("¿Cuántos asientos quieres reservar?: "));
    if (isNaN(cantidad) || cantidad <= 0) {
        console.log("⚠ Debes ingresar un número válido de asientos.");
        return menuReservas();
    }

    let seleccionados = [];
    for (let i = 0; i < cantidad; i++) {
        const codigo = prompt(`Ingresa el código del asiento #${i + 1}: `);
        const asiento = asientosDisponibles.find(a => a.codigo_asiento === codigo);
        if (!asiento) {
            console.log("⚠ Asiento no válido o no disponible. Intenta de nuevo.");
            i--; 
        } else {
            seleccionados.push(asiento);
        }
    }

    console.log(" Has seleccionado los asientos: ", seleccionados.map(a => a.codigo_asiento).join(", "));

    const precioTotal = tarifaSeleccionada.precio * cantidad;
    console.log(` Precio total a pagar: $${precioTotal}`);

    const opcionPago = prompt("Seleccione método de pago (1. Aeropuerto | 2. Tarjeta): ");
    let metodoPago, numeroTarjeta, nombreTitular, vencimiento, cvv;

    if (opcionPago === "1") {
        metodoPago = "Aeropuerto";
        console.log(" Su pago será realizado en el aeropuerto.");
    } else if (opcionPago === "2") {
        metodoPago = "Tarjeta";
        numeroTarjeta = prompt("Ingrese número de tarjeta: ");
        nombreTitular = prompt("Ingrese nombre del titular: ");
        vencimiento = prompt("Ingrese fecha de vencimiento (MM/AAAA): ");
        cvv = prompt("Ingrese CVV: ");
    } else {
        console.log(" Método de pago inválido.");
        return menuReservas();
    }

    
    const datosReserva = await reservasController.reserva({
        idVuelo: vueloSeleccionado.id_vuelo,
        idUsuario: usuario.id_usuario, 
        idTarifa: tarifaSeleccionada.id_tarifa,
        cantidadPasajeros: cantidad,
        asientos: seleccionados.map(a => a.id_asiento)
    });

    await pagosController.registrarPago({
        idReserva: datosReserva.id_reserva,
        metodoPago,
        total: precioTotal,
        numeroTarjeta,
        nombreTitular,
        vencimiento,
        cvv
    });

     await boletoscontroller.generarBoletos({
        idReserva: datosReserva.id_reserva,
        idUsuario: usuario.id_usuario,
        idVuelo: vueloSeleccionado.id_vuelo,
        asientos: seleccionados.map(a => a.id_asiento)
    });

    console.log(" Reserva, pago y boletos generados correctamente.");
    menuReservas();
}

async function misReservas() {
    console.log("******************");
    console.log("MIS RESERVAS");
    console.log("******************");

    const usuario = sesion.getUsuario();
    if (!usuario) {
        console.log("⚠ Debes iniciar sesión primero.");
        return menuPrincipal();
    }

    const reservas = await reservasController.listarReservaUsuario(usuario.id_usuario);

    if (!reservas || reservas.length === 0) {
        console.log("No tienes reservas registradas.");
        return menuReservas();
    }

    reservas.forEach(r => {
        console.log(`
        Reserva #${r.id_reserva}
        Aerolínea: ${r.nombre_aerolinea}
        Ruta: ${r.ciudad_despegue} -> ${r.ciudad_destino}
        Clase: ${r.clase} | Precio: $${r.precio}
        Fecha salida: ${r.fecha_hora_despegue}
        Fecha llegada: ${r.fecha_hora_aterrizaje}
        Asientos: ${r.asientos_reservados.join(", ")}
        `);
    });

    console.log("******************");
    return menuReservas();
}

async function Boletos() {
    console.log("******************");
    console.log("MIS BOLETOS");
    console.log("******************");

    const usuario = sesion.getUsuario();
    if (!usuario) {
        console.log("⚠ Debes iniciar sesión primero.");
        return menuPrincipal();
    }

    const boletos = await boletoscontroller.listarBoletosUsuario(usuario.id_usuario);

    if (!boletos || boletos.length === 0) {
        console.log("⚠ No tienes boletos generados.");
        return menuReservas();
    }

    boletos.forEach(b => {
        console.log(`
        🎫 Boleto: ${b.codigo_boleto}
        Vuelo: ${b.ciudad_despegue} -> ${b.ciudad_destino}
        Asiento: ${b.codigo_asiento}
        Fecha salida: ${b.fecha_salida}
        Fecha llegada: ${b.fecha_llegada}
        `);
    });

    console.log("******************");
    return menuReservas();
}



module.exports = {
    menuPrincipal,
    menu,datosRegistro, datosLogin
}