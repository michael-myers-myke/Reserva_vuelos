const Usuario = require('../models/usuario');
const sesion = require('../utils/sesion');

class UsuarioController {
    registrar = async (data) => {
        try {
            const usuario = await Usuario.crearUsuario(data); 
            console.log(" Usuario registrado correctamente:", usuario.nombre);
        } catch (err) {
            console.error(" Hubo un error al registrarse:", err);
        }
    }

    login = async (data) => {
        try {
            const datosUsuario = await Usuario.autenticar(data); 
            if (datosUsuario) {
                console.log(" Bienvenido:", datosUsuario.nombre);
                
                sesion.setUsuario(datosUsuario);
            } else {
                console.log(" Email o contraseña incorrectos");
            }
        } catch (err) {
            console.error(" Hubo un problema al loguearse:", err.message);
        }
    }

    logout = () => {
        sesion.clearUsuario();
        console.log(" Sesión cerrada");
    }
}

module.exports = UsuarioController;
