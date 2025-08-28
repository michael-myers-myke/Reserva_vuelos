const pool = require("../db/conexion");
const bcrypt = require("bcrypt");

// Crear usuario
exports.crearUsuario = async ({ nombre, email, password }) => {
    try {
        const hash = await bcrypt.hash(password, 10);

        const result = await pool.query(
            "INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3) RETURNING *",
            [nombre, email, hash]
        );

        return result.rows[0];
    } catch (error) {
        console.error(" Error en crearUsuario:", error);
        throw error;
    }
};

// Autenticar usuario
exports.autenticar = async ({ email, password }) => {
    try {
        const result = await pool.query(
            "SELECT * FROM usuarios WHERE email = $1",
            [email]
        );

        if (result.rows.length === 0) return null;

        const usuario = result.rows[0];
        const valido = await bcrypt.compare(password, usuario.password);

        return valido ? usuario : null;
    } catch (error) {
        console.error(" Error en autenticar:", error);
        throw error;
    }
};
