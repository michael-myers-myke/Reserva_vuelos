let usuarioActual = null;

module.exports = {
    setUsuario: (usuario) => {
        usuarioActual = usuario;
    },
    getUsuario: () => usuarioActual,
    clearUsuario: () => {
        usuarioActual = null;
    }
};
