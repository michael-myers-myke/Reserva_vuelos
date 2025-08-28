const Usuario = require('../models/usuario');

class UsuarioController {
    registrar = async (data) => {
        try{
            const usuario = await Usuario.crearUsuario(data); //con esta variable se llaman las funciones del modelo y se le pasan los paramentros por data para que se inserten en la db
            console.log("Usuario registrado correctamente: ", usuario.nombre);
        }catch(err){
            console.error("Hubo un error al registrarse: ", err);
        }
    }

    login = async (data) => {
        try {
            const datosUsuario = await Usuario.autenticar(data); //Variable para llamar las funciones del modelo y hacer una comparacion de datos.
            if(datosUsuario){
                console.log("Bienvenido: ", datosUsuario.nombre);
            } else {
                console.log("Email o contraseña incorrectos");
            }
        }catch(err){
            console.error("Hubo un problema al loguearse: ", err.message);
        }
    }
}

module.exports = UsuarioController;
